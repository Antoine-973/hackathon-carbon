import {Card, CardContent, Typography} from "@mui/material";

interface Formation {
    id: number;
    title: string;
    description: string;
    date: string[];
    participants: Array<string>;
}

export const CardFormation = ({formation}: { formation: Formation }) => {
    return (
        <Card variant="outlined" style={{ height: "100%" }}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {formation.title}
                </Typography>
                <Typography variant="h5" component="h2">
                    Sarah Doria
                </Typography>
                <Typography color="textSecondary">Position</Typography>
                <Typography variant="body2" component="p">
                    Company
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
        </Card>
    );
}