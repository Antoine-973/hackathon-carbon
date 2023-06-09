import {Box, Typography, Stack} from "@mui/material";
import {useTheme} from "@mui/material/styles";

export function RewardCard({niveau, name, src}: { niveau : string, name: string, src: string }) {

    const theme = useTheme();

    return (
       <Box
            sx={{
                backgroundColor: theme.palette.success.main,
                borderRadius: '10px',
                minWidth: '200px',
                width:'100%',
                height: '50px',
                display:'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection:'row',
                color: theme.palette.secondary.main
            }}
       >
           <Stack  alignItems={'center'}>
               <Typography variant={'caption'}>
                   au niveau {niveau}
               </Typography>
               <Typography fontWeight={'bold'} sx={{
                   width:'100%',
               }} >
                   {name}
               </Typography>
           </Stack>

           <img
               width={'40px'}
               height={'40px'}
               style={{
                   borderRadius: '15px',
                   marginLeft: '10px'
               }}
               src={src} alt={"Image de la récompence : " + name }
           />

       </Box>
    )
}