
import  { createContext, useContext, useState} from 'react';
import {Modal, Box, useTheme, Typography} from '@mui/material';

interface Modal {
    open: boolean;
    setOpen: (open: boolean) => void;
    content: any;
}

export const ModalContext = createContext({} as Modal);

export default function ModalProvider({children}: { children: any }) {

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);

    const handleClose = () => {
        setOpen(false);
    }

    const openModal = (  {title, content}) => {
        setTitle(title);
        setContent(content);
        setOpen(true);
    }

    const theme = useTheme() ;


    return (
        <ModalContext.Provider value={{openModal}}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        borderRadius: 2,
                        textAlign: 'center',
                        p: 4,
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.primary.main,
                        }}
                >
                    <Typography sx={{
                        color : theme.palette.primary.main
                    }}>
                        {title}
                    </Typography>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        {content}
                    </Box>

                </Box>
            </Modal>
            {children}
        </ModalContext.Provider>
    )
}

export const useModalContext = () => useContext(ModalContext);