import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export class Error_Boundary extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error)
    {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo)
    {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render()
    {
        if (this.state.hasError)
        {
            return (
                <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                minHeight="80vh" 
                p={3}
                textAlign="center"
                >
                <Paper elevation={3} sx={{ p: 4, maxWidth: 600 }}>
                    <ErrorOutlineIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
                    <Typography variant="h5" component="h1" color="error" gutterBottom>
                    Oops! Something went wrong.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    We're sorry for the inconvenience. Please try refreshing the page.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
                    Refresh Page
                    </Button>
                    {this.state.errorInfo && (
                    <Box sx={{ mt: 4, p: 2, border: '1px dashed grey', overflow: 'auto', maxHeight: '200px' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                        </Typography>
                    </Box>
                    )}
                </Paper>
                </Box>
            );
        }

        return this.props.children;
    }
};
