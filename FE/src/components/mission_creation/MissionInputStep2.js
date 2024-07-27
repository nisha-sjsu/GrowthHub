import React, { useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Paper,
    IconButton,
    Popover,
    Tooltip,
    RadioGroup,
    Radio,
    FormControlLabel,
    Grid,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { categories } from '../../config';

const MissionInputStep2 = ({ onNext, onBack, data }) => {
    const [startDate, setStartDate] = useState(data.startDate || '');
    const [endDate, setEndDate] = useState(data.endDate || '');
    const [visibility, setVisibility] = useState(data.visibility ? 'public' : 'private');
    const [category, setCategory] = useState(data.category || '');
    const [anchorElVisibility, setAnchorElVisibility] = useState(null);
    const [anchorElCategory, setAnchorElCategory] = useState(null);

    const handleNext = () => {
        if (startDate && endDate && visibility && category) {
            let publicMission = visibility === "public";
            onNext({ startDate, endDate, publicMission, category });
        }
    };

    const handleBack = () => {
        onBack();
    };

    const handlePopoverOpenVisibility = (event) => {
        setAnchorElVisibility(event.currentTarget);
    };

    const handlePopoverCloseVisibility = () => {
        setAnchorElVisibility(null);
    };

    const handlePopoverOpenCategory = (event) => {
        setAnchorElCategory(event.currentTarget);
    };

    const handlePopoverCloseCategory = () => {
        setAnchorElCategory(null);
    };

    const openVisibility = Boolean(anchorElVisibility);
    const openCategory = Boolean(anchorElCategory);
    const isNextButtonEnabled = startDate && endDate && visibility && category; // Validation for enabling the Next button

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                    Mission Creation
                </Typography>

                <Grid container spacing={2} direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            label="Start Date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: '300px' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="End Date"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: '300px' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                            <Typography>Visibility:</Typography>
                            <RadioGroup
                                aria-label="visibility"
                                name="visibility"
                                value={visibility}
                                onChange={(e) => setVisibility(e.target.value)}
                                style={{ flexDirection: 'row' }}
                            >
                                <FormControlLabel value="public" control={<Radio />} label="Public" />
                                <FormControlLabel value="private" control={<Radio />} label="Private" />
                            </RadioGroup>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                            <Typography>Category:</Typography>
                            <RadioGroup
                                aria-label="category"
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ flexDirection: 'row' }}
                            >
                                {categories.map((cat) => (
                                    <FormControlLabel
                                        key={cat}
                                        value={cat}
                                        control={<Radio />}
                                        label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    />
                                ))}
                            </RadioGroup>
                        </div>
                    </Grid>
                </Grid>

                <Button variant="contained" color="primary" onClick={handleNext} disabled={!isNextButtonEnabled} style={{ margin: '20px' }}>
                    Next
                </Button>
                <Button variant="contained" color="primary" onClick={handleBack} style={{ margin: '20px' }}>
                    Back
                </Button>
            </Paper>
        </div>
    );
};

export default MissionInputStep2;
