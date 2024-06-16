import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const useModal = () => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        //queryClient.removeQueries(['productSelect']);
        //queryClient.removeQueries(['productId']);
        //queryClient.removeQueries(['idSelect']);
        queryClient.removeQueries(['productSelect']);
        setOpen(false)
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '35%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '12px',
        p: 4,
    };

    return { open, handleOpen, handleClose, style };
};

export default useModal;