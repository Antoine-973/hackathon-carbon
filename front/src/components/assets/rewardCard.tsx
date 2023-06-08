import {Box, Typography} from "@mui/material";

export function RewardCard({comingReward}: { comingReward: any }) {

    return (
        <Box>
            <Box style={{
                backgroundColor: '#5B98D276',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: 'fit-content',
                padding: 10,
                borderRadius: 10,
                justifyContent: 'space-between',
                maxWidth: 500
            }}>
                <Typography variant={'p'} sx={{
                    color: '#282C2B',
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginRight: 5
                }}>
                    Prochaine Récompense
                </Typography>
                <img
                    src={comingReward.img}
                    alt={comingReward.name}
                    style={{width: 100, height: 80, objectFit: "cover"}}
                />
            </Box>
        </Box>
    )
}