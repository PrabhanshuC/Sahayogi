const dashboard = (request, response) =>
{
    if(request.user.role === "admin")
        return response.render("admin_dashboard.ejs");
    
    response.render("dashboard.ejs");
};

module.exports = dashboard;
