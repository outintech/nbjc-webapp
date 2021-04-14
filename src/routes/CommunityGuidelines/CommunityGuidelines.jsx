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
        People come to The Lavender Book to find local businesses that are safe for the Black LGBTQIA+ community. We know that people won’t always agree, but we expect everyone on the platform to treat one another and the platform with honesty and respect. We’ve put together these general guidelines to help set the tone for discourse on the site—just in case.
      </Typography>
    </Box>
    <Box component="span" display="block" p={1} m={1}>
      <Typography align="left">
        <strong>Relevance: </strong>
        Please make sure your contributions are appropriate to the forum. For example, reviews aren’t the place for rants about political ideologies, a business’s employment practices, extraordinary circumstances, or other matters that don’t address the core of the consumer experience. This platform is meant to identify local businesses that are safe for the Black LGBTQIA+ community as consumers, keep this in mind when writing a business review.
      </Typography>
      <Typography align="left">
        <strong>Inappropriate content: </strong>
        Colorful language and imagery are fine, but there’s no place for threats, harassment, lewdness, hate speech, or other displays of bigotry. When they go low, we go high.
      </Typography>
      <Typography align="left">
        <strong>Conflicts of interest: </strong>
        Your contributions to The Lavender Book should be unbiased and objective. For example, you shouldn’t write reviews of your own business or employer, your friends’ or relatives’ business, your peers or competitors in your industry, or businesses in your networking group.
      </Typography>
      <Typography align="left">
        <strong>Privacy: </strong>
        Do not publicize people’s private information. Do not post photographs or videos of other consumers in the establishment.
      </Typography>
      <Typography align="left">
        <strong>Promotional content: </strong>
        Don’t post promotional material. Let’s keep the site useful for the community and not overrun with commercial noise from every user.
      </Typography>
      <Typography align="left">
        <strong>Intellectual property: </strong>
        Don’t swipe content from other sites, users, or businesses. You’re here to provide accurate reviews about your experiences with local businesses, no need to subject the community to lawsuits for swiping content, your words are enough to help others.
      </Typography>
    </Box>
  </div>
);

export default withStyles(styles)(CommunityGuidelines);
