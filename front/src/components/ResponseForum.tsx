import {Typography, Box, Stack, Divider, IconButton, useTheme, Badge} from "@mui/material";
import {ThumbUp,ThumbDown} from "@mui/icons-material";
import {VoteService} from "../services/VoteService.ts";
import {useAuthContext} from "../providers/AuthProvider";
import {useState} from "react";

export default function ({id,valide, response, author, createdAt, negativeVote, positiveVote}: {id: number, valide: boolean, response: string, author: string, createdAt: Date, positiveVote: number, negativeVote: number}) {

    const theme = useTheme() ;
    const {user} = useAuthContext() ;
    const [positiveVotes, setPositiveVotes] = useState(positiveVote);
    const [negativeVotes, setNegativeVotes] = useState(negativeVote);

    return (
        <Stack sx={{
            my:2,
            border: valide && '1px solid green'  ,
        }}>
            {
                !valide &&
                <Divider sx={{my:1}}/>
            }
            <Typography>
                <span
                    dangerouslySetInnerHTML={{__html: response}}
                >

                </span>
            </Typography>
            <Box mt={2} display={'flex'} justifyContent={'flex-end'}>
                {author?.firstname} {author?.lastname} - déposé le {createdAt.toLocaleDateString()}
            </Box>
            <Box alignItems={'center'}  mt={1} display={'flex'} justifyContent={'flex-end'} >
                <IconButton
                    onClick={() => {

                        if(positiveVotes.find((vote) => vote.voterId === user.id)){
                            VoteService.deleteVote(positiveVotes.find((vote) => vote.voterId === user.id).id).then(() => {
                                setPositiveVotes(positiveVotes.filter((vote) => vote.voterId !== user.id))
                            });
                            return ;
                        }
                        if (negativeVotes.find((vote) => vote.voterId === user.id)){
                            return ;
                        }

                        VoteService.vote({
                            voterId: user.id,
                            positiveCommentId: id
                        }).then((data) => {
                            setPositiveVotes([...positiveVotes, data])
                        })
                    }}
                    sx={{color: theme.palette.success.main}}>
                        <ThumbUp/>
                </IconButton>
                <Typography >
                    {positiveVotes.length}
                </Typography>

                <IconButton
                    onClick={() => {

                        if(positiveVotes.find((vote) => vote.voterId === user.id)){
                            return ;
                        }
                        if (negativeVotes.find((vote) => vote.voterId === user.id)){
                           VoteService.deleteVote(negativeVotes.find((vote) => vote.voterId === user.id).id).then(() => {
                               setNegativeVotes(negativeVotes.filter((vote) => vote.voterId !== user.id))
                           });
                            return ;
                        }

                        VoteService.vote({
                            voterId: user.id,
                            negativeCommentId: id
                        }).then((data) => {
                            setNegativeVotes([...negativeVotes, data])
                        })
                    }}

                    sx={{color: theme.palette.secondary.main}}>
                        <ThumbDown/>
                </IconButton>
                <Typography>
                    {negativeVotes.length}
                </Typography>
            </Box>
        </Stack>
    )

}