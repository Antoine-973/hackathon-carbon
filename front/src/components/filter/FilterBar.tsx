import {Box, Divider, IconButton, InputBase, useTheme} from "@mui/material";
import Selector from "../Selector.tsx";
import {SetStateAction} from "react";
import {FilterAltOff} from "@mui/icons-material";

interface Selector {
    title: string;
    value: string;
    values: string[];
    handleChange: (event: { target: { value: SetStateAction<undefined>; }; }) => void;
}

interface FilterBar {
    selectors: Selector[];
    resetFilter: () => void;
    handleSearchChange: (event: { target: { value: SetStateAction<undefined>; }; }) => void;
}

export default function FilterBar ({selectors, resetFilter, handleSearchChange}: FilterBar) {

    const theme = useTheme() ;

    return (
        <>
            <Box sx={{
                top: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: {xs: 'column', md: 'row'},
            }}>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    flexWrap={'wrap'}
                    justifyContent={'center'}
                >
                    {
                        selectors.map((selector: Selector) => {
                            return (
                                <Selector
                                    key={selector.title}
                                    title={selector.title}
                                    value={selector.value}
                                    values={selector.values}
                                    handleChange={(event: { target: { value: SetStateAction<undefined>; }; }) => selector.handleChange(event)}
                                />
                            )
                        })
                    }

                    <IconButton
                        onClick={() => {resetFilter()}}
                        type="button"
                        sx={{ m: 2,  p: '10px', color: theme.palette.secondary.main }}
                        aria-label="Clear"
                    >
                        <FilterAltOff/>
                    </IconButton>
                </Box>
                <Box
                    component="form"
                    sx={{ margin: 1 ,  display: 'flex', alignItems: 'center',  border: '1px solid', borderColor: theme.palette.secondary.main, borderRadius: '5px' }}
                >
                    <InputBase
                        onChange={(event: { target: { value: SetStateAction<undefined>; }; }) => handleSearchChange(event)}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Type name..."
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    <Divider sx={{ height: 28, borderColor: theme.palette.secondary.main }} orientation="vertical" />
                </Box>
            </Box>
            <Divider sx={{p:2}}/>
        </>
    )
}