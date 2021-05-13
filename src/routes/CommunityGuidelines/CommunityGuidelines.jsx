/* eslint-disable max-len */
import { Typography } from '@material-ui/core';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const styles = (theme) => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      margin: '0 20px',
    },
    [theme.breakpoints.up('mobile')]: {
      margin: '0 100px',
    },
  },
});

const CommunityGuidelines = ({ classes }) => (
  <div className={classes.root}>
    <Box component="span" display="block" p={1} m={1}>
      <Typography variant="h4" align="left">
        Community Guidelines
      </Typography>
    </Box>
    <Box component="span" display="block" p={1} m={1}>
      <Typography align="left">
        Members of our community come to the Lavender Book to find businesses, non-profits, places of worship, and spaces to simply be, that are owned and operated by folx who demonstrate consistency in competence and compassion in their approach to providing inclusive, safe, and affirming experiences for Black LGBTQ+/SGL people. We know that people will not always agree, but we expect everyone in the user community to treat one another and the platform with honesty and respect. We drafted these guidelines to help set the tone for discourse on the site:
      </Typography>
    </Box>
    <Box component="span" display="block" p={1} m={1}>
      <Typography align="left">
        <strong>Relevance: </strong>
        Please make sure your contributions are appropriate to the forum. This site is meant to identify resources and services that are inclusive, safe, and affirming for this community. Please keep this in mind when writing a review.
      </Typography>
      <Typography align="left">
        <strong>Conflicts of interest: </strong>
        Colorful language and imagery are fine, but there’s no place for threats, harassment, lewdness, hate speech, or other displays of bigotry, bias, or hate.
      </Typography>
      <Typography align="left">
        <strong>Privacy: </strong>
        Do not publicize people’s private information. Do not post photographs or videos of employees or other customers in the establishment.
      </Typography>
      <Typography align="left">
        <strong>Promotional content: </strong>
        Don’t post promotional material. Let’s keep the site useful for the community and not overrun with commercial noise from every user.
      </Typography>
      <Typography align="left">
        <strong>Intellectual property: </strong>
        Don’t swipe content from other sites, users, or businesses. You’re here to provide accurate reviews about your experiences with local businesses. No need to subject the community to lawsuits for swiping content. Your words are enough to help others.
      </Typography>
    </Box>
  </div>
);

export default withStyles(styles)(CommunityGuidelines);
