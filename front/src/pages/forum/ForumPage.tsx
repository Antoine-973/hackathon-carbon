import {Container, Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import SideNav from "../../components/SideNav/SideNav";
import {SetStateAction, useState} from "react";
import FilterBar from "../../components/filter/FilterBar";
import CardForum from "../../components/card/CardForum";

export default function () {

    const [date,setDate] = useState('');
    const [techno,setTechno] = useState('');
    const [tag,setTag] = useState('');
    const [search,setSearch] = useState('');

    const handleDateChange = (event: { target: { value: SetStateAction<undefined>; }; }) => {
        setDate(event.target.value);
    }
    const handleTechnoChange = (event: { target: { value: SetStateAction<undefined>; }; }) => {
        setTechno(event.target.value);
    }
    const handleTagChange = (event: { target: { value: SetStateAction<undefined>; }; }) => {
        setTag(event.target.value);
    }
    const handleSearchChange = (event: { target: { value: SetStateAction<undefined>; }; }) => {
        setSearch(event.target.value);
    }



    const theme = useTheme() ;

    return (
        <Container>
            <Grid container spacing={2}>
                <SideNav links={[
                    {name:'Général', path:'/forum'},
                    {name:'Utilisateur', path:'/forum/user/:id'},
                    {name:'Client', path:'/forum/client/:id'},
                ]}/>
                <Grid item xs={10}>
                    <FilterBar
                        selectors={[
                            {
                                title: 'Date',
                                value: date,
                                values: ['Date 1', 'Date 2', 'Date 3'],
                                handleChange: handleDateChange
                            },
                            {
                                title: 'Techno',
                                value: techno,
                                values: ['Techno 1', 'Techno 2', 'Techno 3'],
                                handleChange: handleTechnoChange
                            },
                            {
                                title: 'Tag',
                                value: tag,
                                values: ['Tag 1', 'Tag 2', 'Tag 3'],
                                handleChange: handleTagChange
                            }
                        ]}
                        resetFilter={() => {
                            setDate('');
                            setTechno('');
                            setTag('');
                        }}
                        handleSearchChange={(evt) => {setSearch(evt.target.value)}}
                    ></FilterBar>
                    <CardForum
                        title={'Titre du post'}
                        createdAt={new Date()}
                        description={'Description du post'}
                        chips={['tag1', 'tag2', 'tag3']}
                        author={"Arthur"}

                    >
                    </CardForum>
                </Grid>
            </Grid>
        </Container>
    )
}