const Article = require("../models/Article");
const User = require("../models/User");

/**
 * @desc    Perform a global search across articles and users
 * @route   GET /api/search
 * @access  Public
 */
const global_search = async (request, response) =>
{
    try
    {
        const { q, author_username, tags, start_date, end_date } = request.query;
        const article_query_conditions = {};
        const user_query_conditions = {};
        let search_regex = null; // Initialize to null

        // Define search_regex if 'q' is present
        if (q) {
            search_regex = new RegExp(q, 'i');
        }

        // 1. Apply general search query 'q' to articles and users if present
        if (search_regex) { // Use search_regex if it's defined
            article_query_conditions.$or = [
                { title: { $regex: search_regex } },
                { content: { $regex: search_regex } },
                { tags: { $in: [search_regex] } }
            ];
            user_query_conditions.$or = [
                { username: { $regex: search_regex } },
                { email: { $regex: search_regex } },
                { about: { $regex: search_regex } }
            ];
        }

        // 2. Filter by Author Username (only for articles)
        if (author_username)
        {
            const author_regex = new RegExp(author_username, 'i');
            const author_users = await User.find({ username: { $regex: author_regex } }).select('_id');
            
            if (author_users.length > 0) {
                article_query_conditions.author = { $in: author_users.map(u => u._id) };
            } else {
                return response.status(200).json({ articles: [], users: [] });
            }
        }

        // 3. Filter by Tags (only for articles)
        if (tags)
        {
            const tags_regex_array = tags.split(',').map(tag => new RegExp(tag.trim(), 'i'));
            // Use $all for matching all tags, or $in for any tag match
            article_query_conditions.tags = { $in: tags_regex_array }; 
        }

        // 4. Filter by Date Range (only for articles)
        if (start_date || end_date)
        {
            article_query_conditions.createdAt = {};
            if (start_date) {
                article_query_conditions.createdAt.$gte = new Date(start_date);
            }
            if (end_date) {
                article_query_conditions.createdAt.$lte = new Date(end_date);
            }
        }

        // If no search query and no filters, return all articles
        // Check if any search criteria were provided at all
        const has_search_criteria = q || author_username || tags || start_date || end_date;

        if (!has_search_criteria) {
            const all_articles = await Article.find().populate("author", "username");
            return response.status(200).json({ articles: all_articles, users: [] });
        }

        const search_results = {
            articles: [],
            users: []
        };

        // Perform Article Search
        const found_articles = await Article.find(article_query_conditions).populate("author", "username");
        search_results.articles = found_articles;

        // Perform User Search (only if a general query 'q' is provided)
        // Ensure user search doesn't run if only article-specific filters are present
        if (q) { // Only search users if there's a general text query
            user_query_conditions.role = { $nin: ["admin", "system"] }; 
            const found_users = await User.find(user_query_conditions).select('username email about github website');
            search_results.users = found_users;
        }

        if (search_results.articles.length === 0 && search_results.users.length === 0) {
            return response.status(200).json({ message: "No results found matching your query.", articles: [], users: [] });
        }

        response.status(200).json(search_results);

    }
    catch (error)
    {
        console.error("Global search error:", error);
        response.status(500).json({ message: "An internal server error occurred during search." });
    }
};

module.exports = global_search;
