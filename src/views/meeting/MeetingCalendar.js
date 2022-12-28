import React from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './EventUtils';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import SwipeIcon from '@mui/icons-material/Swipe';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default class MeetingCalendar extends React.Component {
    state = {
        weekendsVisible: true,
        currentEvents: []
    };

    render() {
        return (
            <Grid container spacing={2} justifyContent="center">
                <Grid container direction="column" justifyContent="flex-start" alignItems="stretch" item xs={12} sm={10} md={8}>
                    <Grid item>
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                            }}
                            initialView="dayGridMonth"
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            weekends={this.state.weekendsVisible}
                            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                            select={this.handleDateSelect}
                            eventContent={renderEventContent} // custom render function
                            eventClick={this.handleEventClick}
                            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                            /* you can update a remote database when these fire:
                            eventAdd={function(){}}
                            eventChange={function(){}}
                            eventRemove={function(){}}
                            */
                        />
                    </Grid>
                </Grid>
                <Grid container direction="column" justifyContent="flex-start" alignItems="stretch" item xs={12} sm={2} md={4}>
                    <Grid item>{this.renderSidebar()}</Grid>
                </Grid>
            </Grid>
        );
    }

    renderSidebar() {
        return (
            <Grid container spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch">
                <Grid item>
                    <Card variant="outlined">
                        <CardHeader
                            avatar={<HelpOutlineIcon />}
                            title="Instructions"
                            action={
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={this.state.weekendsVisible} onChange={this.handleWeekendsToggle} />}
                                        label="Display weekends"
                                    />
                                </FormGroup>
                            }
                            style={{ backgroundColor: '#E3F2FD' }}
                        ></CardHeader>
                        <Divider light />
                        <CardContent>
                            <Typography variant="h5" component="p" sx={{ mb: 1 }}>
                                <PanToolAltIcon /> Select dates and you will be prompted to create a new event
                            </Typography>
                            <Typography variant="h5" component="p" sx={{ mb: 1 }}>
                                <SwipeIcon /> Drag, drop, and resize events
                            </Typography>
                            <Typography variant="h5" component="p">
                                <TouchAppIcon /> Click an event to delete it
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card variant="outlined">
                        <CardHeader
                            avatar={<EventIcon />}
                            title="All Events"
                            action={
                                <Button variant="contained" startIcon={<AddIcon />} size="small" sx={{ mr: 1 }}>
                                    Book
                                </Button>
                            }
                            style={{ backgroundColor: '#E3F2FD' }}
                        ></CardHeader>
                        <Divider light />
                        <CardContent>{this.state.currentEvents.map(renderSidebarEvent)}</CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
        // return (
        //     <div className="demo-app-sidebar">
        //         <div className="demo-app-sidebar-section">
        //             <h2>Instructions</h2>
        //             <ul>
        //                 <li>Select dates and you will be prompted to create a new event</li>
        //                 <li>Drag, drop, and resize events</li>
        //                 <li>Click an event to delete it</li>
        //             </ul>
        //         </div>
        //         <div className="demo-app-sidebar-section">

        //         </div>
        //         <div className="demo-app-sidebar-section">
        //             <h2>All Events ({this.state.currentEvents.length})</h2>
        //             <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
        //         </div>
        //     </div>
        // );
    }

    handleWeekendsToggle = () => {
        this.setState({
            weekendsVisible: !this.state.weekendsVisible
        });
    };

    handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event');
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            });
        }
    };

    handleEventClick = (clickInfo) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove();
        }
    };

    handleEvents = (events) => {
        this.setState({
            currentEvents: events
        });
    };
}

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    );
}

function renderSidebarEvent(event) {
    return (
        <Alert
            severity="info"
            sx={{ mb: 2 }}
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    onClick={() => {
                        handleSidebarEventDelete(event);
                    }}
                >
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            }
        >
            <AlertTitle>{event.title}</AlertTitle>
            Duration — <strong>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</strong>
        </Alert>
        // <li key={event.id}>
        //     <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        //     <i>{event.title}</i>
        // </li>
    );
}

function handleSidebarEventDelete(event) {
    if (confirm(`Are you sure you want to delete the event '${event.title}'`)) {
        event.remove();
    }
}
