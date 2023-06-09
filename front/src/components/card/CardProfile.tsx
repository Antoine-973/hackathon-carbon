import {Box, Card, CardContent, Stack, Typography, Grid, Chip, CardActions, CardActionArea} from "@mui/material";

interface Profile {
    prenom: string;
    nom: string;
    techno: string[];
    expertise: string;
    dispo: string;
    client: string;
    photo: string;
    action: () => void;

}

export default function CardProfile({prenom, nom, expertise, techno, photo, dispo, client, action}: Profile) {

    return (
      <Card>
          <CardActionArea onClick={action}>
              <CardContent>
                  <Box display={'flex'} >
                      <img width={50} height={50} src={photo} alt="profile" />
                      <Stack mx={1}>
                          <Typography  variant="h5" component="div">
                              {prenom} {nom}
                          </Typography>
                          <Box display={'flex'}  >
                              <Chip size={'small'} color={'secondary'}  sx={{
                                    marginRight: 1
                              }} label={expertise}></Chip>
                              <Chip size={'small'}  color={'info'} label={dispo}></Chip>
                          </Box>

                      </Stack>
                  </Box>
                  <Typography gutterBottom variant={'caption'}>
                      En mission chez {client}
                  </Typography>
                  <Grid container spacing={2}>
                      {
                          techno &&
                          techno.length > 0 &&
                          techno.map((techno: string) => {
                              return (
                                  <Grid item key={techno}>
                                      {techno}
                                  </Grid>
                              )
                          })
                      }
                  </Grid>
              </CardContent>
          </CardActionArea>
      </Card>
    )

}