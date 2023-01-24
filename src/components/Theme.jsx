import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, grey, yellow } from '@mui/material/colors';

export const globalTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 769,
            lg: 1000,
            xl: 1920,
        },
    },
    // palette: {
    //     // mode: 'dark',
    //     primary: {
    //         main: green[400],
    //         contrastText: '#fff'
    //     },
    //     background: {
    //         default: '#f5f5f5',
    //     },
    // },
    // components: {
    //     MuiBackdrop: {
    //         defaultProps: {
    //             sx: {
    //                 backgroundColor: '#f5f5f5',
    //             }
    //         }
    //     }
    // }
});