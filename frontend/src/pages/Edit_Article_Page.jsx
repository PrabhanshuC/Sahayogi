import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Snackbar,
    Alert,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    IconButton,
    Container
} from '@mui/material';

import { useAuth } from '../hooks/useAuth';
import { api_request } from '../api';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';
import LinkIcon from '@mui/icons-material/Link';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import RemoveIcon from '@mui/icons-material/Remove';
import VisibilityIcon from '@mui/icons-material/Visibility';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Loading } from '../components/feedback/Loading';

const Edit_Article_Page = () =>
{
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    
    const [title, set_title] = useState('');
    const [content, set_content] = useState('');
    const [loading_initial, set_loading_initial] = useState(true);
    const [submitting, set_submitting] = useState(false);
    const [error, set_error] = useState(null);
    const [open_snackbar, set_open_snackbar] = useState(false);
    const [snackbar_message, set_snackbar_message] = useState('');
    const [snackbar_severity, set_snackbar_severity] = useState('success');
    const [view_mode, set_view_mode] = useState('write');

    const content_ref = useRef(null);

    const apply_markdown = (prefix, suffix = '', placeholder = '', insert_newline = false) =>
    {
        const textarea = content_ref.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected_text = textarea.value.substring(start, end);

        let new_content;
        let new_cursor_pos;

        if (insert_newline) {
            const line_start = textarea.value.substring(0, start).lastIndexOf('\n') + 1;
            const current_line_content = textarea.value.substring(line_start, start);
            if (!current_line_content.trim())
            {
                new_content = textarea.value.substring(0, start) + prefix + selected_text + suffix + textarea.value.substring(end);
                new_cursor_pos = start + prefix.length;
            }
            else
            {
                new_content = textarea.value.substring(0, start) + '\n' + prefix + selected_text + suffix + textarea.value.substring(end);
                new_cursor_pos = start + 1 + prefix.length;
            }
        } else {
            new_content = textarea.value.substring(0, start) + prefix + (selected_text || placeholder) + suffix + textarea.value.substring(end);
            new_cursor_pos = start + prefix.length + (selected_text ? selected_text.length : placeholder.length);
        }

        set_content(new_content);

        setTimeout(() => {
            textarea.selectionStart = new_cursor_pos;
            textarea.selectionEnd = new_cursor_pos;
            textarea.focus();
        }, 0);
    };

    const handle_view_mode_change = (event, new_mode) => {
        if (new_mode !== null) {
            set_view_mode(new_mode);
        }
    };

    useEffect(() => {
        const fetch_article_for_edit = async () =>
        {
            set_loading_initial(true);
            set_error(null);
            try
            {
                const data = await api_request(`/api/articles/${id}`, 'GET', null, token);
                set_title(data.title);
                set_content(data.content);
            }
            catch (err)
            {
                set_error(err.message);
                set_snackbar_message("Failed to load article for editing: " + err.message);
                set_snackbar_severity('error');
                set_open_snackbar(true);
            }
            finally
            {
                set_loading_initial(false);
            }
        };

        if (token && id)
            fetch_article_for_edit();
    }, [id, token]);

    const handle_submit = async (event) =>
    {
        event.preventDefault();
        set_submitting(true);
        try
        {
            await api_request(`/api/articles/${id}`, 'PUT', { title, content }, token);
            set_snackbar_message('Article updated successfully!');
            set_snackbar_severity('success');
            set_open_snackbar(true);
            navigate('/dashboard');
        }
        catch (err)
        {
            set_snackbar_message(err.message);
            set_snackbar_severity('error');
            set_open_snackbar(true);
        }
        finally
        {
            set_submitting(false);
        }
    };

    const handle_close_snackbar = () =>
    {
        set_open_snackbar(false);
    };

    const handle_cancel = () => {
        navigate('/dashboard');
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 2, minHeight: '500px', display: 'flex', flexDirection: 'column', boxShadow: `0px 2px 4px -1px rgba(102, 56, 0, 0.2), 0px 4px 5px 0px rgba(102, 56, 0, 0.14), 0px 1px 10px 0px rgba(102, 56, 0, 0.12)` }}> {/* Apply custom shadow */}
                <Typography component="h1" variant="h5" align="center" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}> {/* Apply text color */}
                    Edit Article
                </Typography>
                
                {loading_initial ? (
                    <Loading message="Loading article for edit..." />
                ) : error ? (
                    <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
                ) : (
                    <Box component="form" onSubmit={handle_submit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
                        <TextField
                            required
                            fullWidth
                            id="title"
                            label="Article Title"
                            name="title"
                            autoFocus
                            value={title}
                            onChange={(e) => set_title(e.target.value)}
                            disabled={submitting ? true : false}
                            sx={{ mb: 2 }}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <ToggleButtonGroup
                                value={view_mode}
                                exclusive
                                onChange={handle_view_mode_change}
                                aria-label="text editor view mode"
                                size="small"
                            >
                                <ToggleButton value="write" aria-label="write mode">
                                    Write
                                </ToggleButton>
                                <ToggleButton value="preview" aria-label="preview mode">
                                    <VisibilityIcon /> Preview
                                </ToggleButton>
                            </ToggleButtonGroup>

                            {/* Markdown Toolbar */}
                            {view_mode === 'write' && (
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                    <IconButton size="small" onClick={() => apply_markdown('**', '**', 'bold text')} aria-label="bold"><FormatBoldIcon /></IconButton>
                                    <IconButton size="small" onClick={() => apply_markdown('*', '*', 'italic text')} aria-label="italic"><FormatItalicIcon /></IconButton>
                                    <IconButton size="small" onClick={() => apply_markdown('## ', '', 'Heading 2', true)} aria-label="heading 2"><LooksTwoIcon /></IconButton>
                                    <IconButton size="small" onClick={() => apply_markdown('- ', '', 'List item', true)} aria-label="unordered list"><FormatListBulletedIcon /></IconButton>
                                    <IconButton size="small" onClick={() => apply_markdown('> ', '', 'Quote', true)} aria-label="quote"><FormatQuoteIcon /></IconButton>
                                    <IconButton size="small" onClick={() => apply_markdown('`', '`', 'code')} aria-label="inline code"><CodeIcon /></IconButton>
                                    <IconButton size="small" onClick={() => apply_markdown('```\n', '\n```', 'code block', true)} aria-label="code block"><CodeIcon sx={{ transform: 'scaleX(-1)' }} /></IconButton>
                                    <IconButton size="small" onClick={() => apply_markdown('[', '](url)', 'link text')} aria-label="link"><LinkIcon /></IconButton>
                                    <IconButton size="small" onClick={() => apply_markdown('---\n', '', '', true)} aria-label="horizontal rule"><RemoveIcon /></IconButton>
                                </Box>
                            )}
                        </Box>

                        {view_mode === 'write' ? (
                            <TextField
                                required
                                fullWidth
                                id="content"
                                label="Article Content (Markdown)"
                                name="content"
                                multiline
                                rows={15}
                                value={content}
                                onChange={(e) => set_content(e.target.value)}
                                disabled={submitting ? true : false}
                                inputRef={content_ref}
                                sx={{ flexGrow: 1, mb: 3 }}
                            />
                        ) : (
                            <Paper variant="outlined" sx={{ p: 2, minHeight: '300px', flexGrow: 1, overflow: 'auto', backgroundColor: (theme) => theme.palette.grey[50] }}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {content || 'Start typing in the "Write" tab to see a preview here.'}
                                </ReactMarkdown>
                            </Paper>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 3 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                size="large"
                                onClick={handle_cancel}
                                disabled={submitting ? true : false}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={handle_submit}
                                disabled={submitting ? true : false}
                            >
                                {submitting ? <CircularProgress size={24} /> : 'Update Article'}
                            </Button>
                        </Box>
                    </Box>
                )}
                <Snackbar open={open_snackbar} autoHideDuration={6000} onClose={handle_close_snackbar}>
                    <Alert onClose={handle_close_snackbar} severity={snackbar_severity} sx={{ width: '100%' }}>
                        {snackbar_message}
                    </Alert>
                </Snackbar>
            </Paper>
        </Container>
    );
};

export default Edit_Article_Page;
