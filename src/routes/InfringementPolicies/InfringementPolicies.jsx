/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import { Typography } from '@material-ui/core';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

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

const InfringementPolicies = ({ classes }) => (
  <div className={classes.root}>
    <Box component="span" display="block" p={1} m={1}>
      <Typography variant="h4" align="left">
        Infringement Policies
      </Typography>
    </Box>
    <Box component="span" display="block" p={1} m={1}>
      <Typography align="left">
        Last Updated on May 17, 2021.
      </Typography>
    </Box>
    <Box component="span" display="block" p={1} m={1}>
      <Typography align="left">
        We take intellectual property abuse seriously. If you believe that your copyright or trademark is being infringed on the Site, please send us a written notice with the following information:
      </Typography>
    </Box>
    <Grid container spacing={1}>
      <Grid item xs={2}>
        <Typography align="right">
          1.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          Identification of the copyrighted or trademarked work that you claim has been infringed;
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          2.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          Identification of the allegedly infringing content, and information reasonably sufficient to permit Lavender Book to locate it on the Site (e.g., the URL for the web page on which the content appears);
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          3.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          A statement by you that you have a good faith belief that the use of the content identified in your notice in the manner complained of is not authorized by the copyright/trademark owner, its agent, or the law;
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          4.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          A statement by you that you attest, under penalty of perjury, that the information in your notice is accurate and that you are the copyright/trademark owner or authorized to act on the owner's behalf; and
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          5.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          Your physical or electronic signature, together with your contact information (address, telephone number and, if available, email address).
        </Typography>
      </Grid>
    </Grid>
    <Box component="span" display="block" p={1} m={1}>
      <Typography align="left">
        At the same time, we do not take kindly to those who abuse the scope of their own intellectual property rights. If you believe that your content should not have been removed for alleged copyright or trademark infringement, you may send us a written counter-notice with the following information:
      </Typography>
    </Box>
    <Grid container spacing={1}>
      <Grid item xs={2}>
        <Typography align="right">
          1.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          Identification of the copyrighted or trademarked work that was removed, and the location on the Site where it would have been found prior to its removal;
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          2.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          A statement, under penalty of perjury, that you have a good faith belief that the content was removed as a result of a mistake or misidentification. For trademark disputes only: information reasonably sufficient to explain why you believe you are not infringing the trademarked work;
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          3.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          A statement that you consent either to the jurisdiction of (a) the Federal District Court for the judicial district in which your address is located if you live in the United States, or (b) any judicial district in which Yelp is located if you live outside the United States. Please also include a statement that you will accept service of process from the person who sent the original infringement notice to Yelp, or an agent of such person;
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          4.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          Your physical or electronic signature, together with your contact information (address, telephone number and, if available, email address).
        </Typography>
      </Grid>
    </Grid>
    <Box component="span" display="block" p={1} m={1}>
      <Typography align="left">
        We will respond to all such notices and comply with applicable law. We reserve the right to remove content alleged to be infringing without prior notice and at our sole discretion. We also reserve the right to terminate a user's account if the user is determined to be a repeat infringer.
      </Typography>
    </Box>
    <Box component="span" display="block" p={1} m={1}>
      <Typography>
        You can send us your copyright or trademark notices in the following ways.
      </Typography>
    </Box>
    <Box component="span" display="block" p={1} m={1}>
      <Typography>
        Through our online form:
        <br />
        <a href="https://forms.gle/p3hBGZ3dWhDPP98U6" target="_blank" rel="noreferrer">Contact Us</a>
      </Typography>
    </Box>
  </div>
);

export default withStyles(styles)(InfringementPolicies);
