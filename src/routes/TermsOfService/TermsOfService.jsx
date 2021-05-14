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

const TermsOfService = ({ classes }) => (
  <div className={classes.root}>
    <Box component="span" display="block" p={1} m={1}>
      <Typography variant="h4" align="left">
        Terms of Service
      </Typography>
    </Box>
    <Box component="span" display="block" p={1} m={1}>
      <Typography align="left">
        <strong>Last Updated on May 17, 2021.</strong>
        These Terms of Service are effective immediately for users accessing or using the Service without an Account or those registering.
      </Typography>
    </Box>
    <Box component="span" display="block" p={1} m={1}>
      <Typography align="left">
        <strong>
          PLEASE NOTE: THESE TERMS INCLUDE DISPUTE RESOLUTION PROVISIONS (SEE SECTION 13) THAT, WITH LIMITED EXCEPTIONS, REQUIRE THAT (1) CLAIMS YOU BRING AGAINST THE LAVENDER BOOK BE RESOLVED BY BINDING, INDIVIDUAL ARBITRATION, AND (2) YOU WAIVE YOUR RIGHT TO BRING OR PARTICIPATE IN ANY CLASS, GROUP, OR REPRESENTATIVE ACTION OR PROCEEDING.
        </strong>
      </Typography>
    </Box>
    <Box component="span" display="block" p={1} m={1}>
      <Typography align="left">
        These Terms govern your access to and use of our products and services, including those offered through our websites, events, communications (e.g., emails, phone calls, and texts) and mobile applications (collectively, the “
        <strong>Service</strong>
        ”). By accessing or using the Service, you are agreeing to these Terms, which form a legally binding contract with: (i) (trademarked name of business). “
        <strong>Lavender Book</strong>
        ” means (trademarked name of business)., as applicable. Do not access or use the Service if you are unwilling or unable to be bound by the Terms.
      </Typography>
    </Box>
    <Box component="span" display="block" p={1} m={1}>
      <Typography align="left">
        <strong>DEFINITIONS</strong>
      </Typography>
    </Box>
    <Grid container spacing={1}>
      <Grid item xs={2}>
        <Typography align="right">
          A.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          <strong>Parties</strong>
          . “
          <strong>You</strong>
          ” and “
          <strong>your</strong>
          ” refer to you, as a user of the Service. A “
          <strong>user</strong>
          ” is someone who accesses or in any way uses the Service. “
          <strong>We</strong>
          ,” “
          <strong>us</strong>
          ,” and “
          <strong>our</strong>
          ” refer to
          <strong> Lavender Book</strong>
          {' '}
          and its subsidiaries.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          B.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          <strong>Content</strong>
          . “
          <strong>Content</strong>
          ” means text, images, photos, audio, video, and all other forms of data or communication. “
          <strong>Your Content</strong>
          ” means Content that you submit or transmit to, through, or in connection with the Service, such as ratings, reviews, photos, videos, compliments, invitations, check-ins, votes, friending and following activity, direct messages, and information that you contribute to your user profile or suggest for a business page. “
          <strong>User Content</strong>
          ” means Content that users submit or transmit to, through, or in connection with the Service. “
          <strong>Lavender Book Content</strong>
          ” means Content that we create and make available in connection with the Service. “
          <strong>Third Party Content</strong>
          ” means Content that originates from parties other than Lavender Book or its users, which is made available in connection with the Service. “
          <strong>Service Content</strong>
          ” means all of the Content that is made available in connection with the Service, including Your Content, User Content, Lavender Book Content, and Third Party Content.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          C.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          <strong>Sites and Accounts. </strong>
          “
          <strong>Consumer Site</strong>
          ” means Lavender Book’s consumer website (www.lavenderbook.org and related domains) and mobile applications. “
          <strong>Consumer Account</strong>
          ” means the account you create to access or use the Consumer Site.
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align="right">
          2.
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography align="left">
          <strong>CHANGES TO THE TERMS</strong>
          <br />
          We may modify the Terms from time to time. The most current version of the Terms will be located
          {' '}
          <a href="/terms-of-service">here</a>
          . You understand and agree that your access to or use of the Service is governed by the Terms effective at the time of your access to or use of the Service. If we make material changes to these Terms, we will notify you by email, by posting notice on the Service, and/or by other method prior to the effective date of the changes. We will also indicate at the top of this page the date that such changes were last made. You should revisit these Terms on a regular basis as revised versions will be binding on you.
          <strong>You understand and agree that your continued access to or use of the Service after the effective date of changes to the Terms represents your acceptance of such changes.</strong>
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align="right">
          3.
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography align="left">
          <strong>USING THE SERVICE</strong>
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          A.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          <strong>Eligibility. </strong>
          To access or use the Service, you must have the requisite power and authority to enter into these Terms. You may not access or use the Service if we have previously banned you from the Service or closed your Account.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          B.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          <strong>Permission to Use the Service. </strong>
          We grant you permission to use the Service subject to these Terms. Your use of the Service is at your own risk, including the risk that you might be exposed to Content that is offensive, indecent, inaccurate, objectionable, incomplete, fails to provide adequate warning about potential risks or hazards, or is otherwise inappropriate.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          C.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          <strong>Service Availability. </strong>
          The Service may be modified, updated, interrupted, suspended or discontinued at any time without notice or liability.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          D.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          <strong>Accounts. </strong>
          You must create an Account and provide certain information about yourself in order to use some of the features that are offered through the Service. You are responsible for maintaining the confidentiality of your Account password. You are also responsible for all activities that occur in connection with your Account. You agree to notify us immediately of any unauthorized use of your Account. We reserve the right to close your Account at any time for any or no reason.
          Your Consumer Account is for your personal, non-commercial use only, and you may not create or use a Consumer Account for anyone other than yourself. We ask that you provide complete and accurate information about yourself when creating an Account in order to bolster your credibility as a contributor to the Service. You may not impersonate someone else, provide an email address other than your own, create multiple Accounts, or transfer your Consumer Account to another person without Lavender Book’s prior approval.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          E.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          <strong>Communications from Lavender Book and Others. </strong>
          By accessing or using the Service, you consent to receive communications from other users and Lavender Book through the Service, or through any other means such as emails, push notifications, text messages (including SMS and MMS), and phone calls. These communications may promote Lavender Book or businesses listed on Lavender Book, and may be initiated by Lavender Book, businesses listed on Lavender Book, or other users. You further understand that communications may be sent using an automatic telephone dialing system, and that you may be charged by your phone carrier for certain communications such as SMS messages or phone calls. You agree to notify us immediately if the phone number(s) you have provided to us have been changed or disconnected. Please note that any communications, including phone calls, with Lavender Book or made through the Service may be monitored and recorded for quality purposes.
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align="right">
          4.
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography align="left">
          <strong>CONTENT</strong>
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          A.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          <strong>Responsibility for Your Content. </strong>
          You alone are responsible for Your Content, and once posted to Lavender Book, it cannot always be withdrawn. You assume all risks associated with Your Content, including anyone’s reliance on its quality, accuracy, or reliability, and any risks associated with personal information you disclose. You represent that you own or have the necessary permissions to use and authorize the use of Your Content as described herein. You may not imply that Your Content is in any way sponsored or endorsed by Lavender Book.
          You may expose yourself to liability if, for example, Your Content contains material that is false, intentionally misleading, or defamatory; violates any third-party right, including any copyright, trademark, service mark, patent, trade secret, moral right, privacy right, right of publicity, or any other intellectual property or proprietary right; contains material that is unlawful, including illegal hate speech or pornography; exploits or otherwise harms minors; violates or advocates the violation of any law or regulation; or violates these Terms.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          B.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          <strong>Our Right to Use Your Content. </strong>
          We may use Your Content in a number of different ways, including by publicly displaying it, reformatting it, incorporating it into advertisements and other works, creating derivative works from it, promoting it, distributing it, and allowing others to do the same in connection with their own websites and media platforms (“
          <strong>Other Media</strong>
          ”). As such, you hereby irrevocably grant us world-wide, perpetual, non-exclusive, royalty-free, assignable, sublicensable, transferable rights to use Your Content for any purpose. Please note that you also irrevocably grant the users of the Service and any Other Media the right to access Your Content in connection with their use of the Service and any Other Media. Finally, you irrevocably waive, and cause to be waived, against Lavender Book and its users any claims and assertions of moral rights or attribution with respect to Your Content. By “
          <strong>use</strong>
          ” we mean use, copy, publicly perform and display, reproduce, distribute, modify, translate, remove, analyze, commercialize, and prepare derivative works of Your Content.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          C.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          <strong>Ownership. </strong>
          As between you and Lavender Book, you own Your Content. We own the Lavender Book Content, including but not limited to visual interfaces, interactive features, graphics, design, compilation (including, but not limited to, our selection, coordination, aggregation, and arrangement of User Content and other Service Content), computer code, products, software, aggregate star ratings, and all other elements and components of the Service excluding Your Content, User Content and Third Party Content. We also own the copyrights, trademarks, service marks, trade names, trade secrets, and other intellectual and proprietary rights throughout the world associated with the Lavender Book Content and the Service, which are protected by copyright, trade dress, patent, trademark, and trade secret laws and all other applicable intellectual and proprietary rights and laws. As such, you may not sell, license, copy, publish, modify, reproduce, distribute, create derivative works or adaptations of, publicly display or in any way use or exploit any of the Lavender Book Content in whole or in part except as expressly authorized by us. Except as expressly and unambiguously provided herein, we do not grant you any express or implied rights, and all rights in and to the Service and the Lavender Book Content are retained by us.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          D.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          <strong>Advertising. </strong>
          Lavender Book and its licensees may publicly display advertisements, paid content, and other information nearby or in association with Your Content. You are not entitled to any compensation for such advertisements. The manner, mode and extent of such advertising are subject to change without specific notice to you.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          E.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          <strong>Other. </strong>
          User Content (including any that may have been created by users employed or contracted by Lavender Book) does not necessarily reflect the opinion of Lavender Book. Except as required by law, we have no obligation to retain or provide you with copies of Your Content, and we do not guarantee any confidentiality with respect to Your Content. We reserve the right to remove, screen, edit, or reinstate User Content at our sole discretion for any reason or no reason, and without notice to you. For example, we may remove a review if we believe it violates our Community Guidelines.
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align="right">
          5.
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography align="left">
          <strong>REPRESENTATIONS AND WARRANTIES</strong>
          We are under no obligation to enforce the Terms on your behalf against another user. While we encourage you to let us know if you believe another user has violated the Terms, we reserve the right to investigate and take appropriate action at our sole discretion.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          A.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          You represent and warrant that:
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          i.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          You have read and understood our
          {' '}
          <a href="/community-guidelines">Community Guidelines</a>
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          B.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          You also represent and warrant that you will not, and will not assist, encourage, or enable others to use the Service to:
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          i.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Violate our Terms, including the Content Guidelines;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          ii.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Post any fake or falsely defamatory review, trade reviews with others, or compensate someone or be compensated to post, refrain from posting, or remove a review;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          iii.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Violate any third party’s rights, including any breach of confidence, copyright, trademark, patent, trade secret, moral right, privacy right, right of publicity, or any other intellectual property or proprietary right;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          iv.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Threaten, stalk, harm, or harass others, or promote bigotry or discrimination;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          v.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Promote a business or other commercial venture or event, or otherwise use the Service for commercial purposes;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          vi.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Send bulk emails, surveys, or other mass messaging, whether commercial in nature or not; engage in keyword spamming, or otherwise attempt to manipulate the Service’s search results, or any third party website;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          vii.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Solicit personal information from minors, or submit or transmit pornography;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          viii.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Violate any applicable law;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          ix.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Modify, adapt, appropriate, reproduce, distribute, translate, create derivative works or adaptations of, publicly display, sell, trade, or in any way exploit the Service or Service Content (other than Your Content), except as expressly authorized by Lavender Book;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          x.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Use any robot, spider, Service search/retrieval application, or other automated device, process or means to access, retrieve, copy, scrape, or index any portion of the Service or any Service Content, except as expressly permitted by Lavender Book;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          xi.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Remove or modify any copyright, trademark, or other proprietary rights notice that appears on any portion of the Service or on any materials printed or copied from the Service;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          xii.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Record, process, or mine information about users;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          xiii.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Access, retrieve or index any portion of the Service for purposes of constructing or populating a searchable database of business reviews;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          xiv.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Reformat or frame any portion of the Service;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          xv.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Take any action that imposes, or may impose, in our sole discretion, an unreasonable or disproportionately large load on Lavender Book’s technology infrastructure or otherwise make excessive traffic demands of the Service;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          xvi.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Attempt to gain unauthorized access to the Service, Accounts, computer systems or networks connected to the Service through hacking, password mining or any other means;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          xvii.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Use the Service or any Service Content to transmit any computer viruses, worms, defects, Trojan horses, malicious code, spyware, malware or other items of a destructive or harmful nature;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          xviii.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Use any device, software or routine that interferes with the proper working of the Service, or otherwise attempt to interfere with the proper working of the Service;
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          xix.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Use the Service to violate the security of any computer network, crack passwords or security encryption codes; disrupt or interfere with the security of, or otherwise cause harm to, the Service or Service Content; or
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          xx.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography align="left">
          Remove, circumvent, disable, damage or otherwise interfere with any security-related features of the Service, features that prevent or restrict the use or copying of Service Content, or features that enforce limitations on the use of the Service.
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align="right">
          6.
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography align="left">
          <strong>ADDITIONAL POLICIES AND TERMS</strong>
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          A.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          <strong>Copyright and Trademark Disputes. </strong>
          You agree to follow our
          {' '}
          <a href="/infringement-policies">Infringement Policies</a>
          {' '}
          in notifying us about copyright and trademark disputes concerning User Content. You agree we may forward any notification sent pursuant to our Infringement Policy to the user who submitted the User Content at issue.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          B.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          <strong>Additional Terms. </strong>
          Your use of the Service is subject to any and all additional terms, policies, rules, or guidelines that we may post on or link to from the Service (the “
          <strong>Additional Terms</strong>
          ”). All such Additional Terms are hereby incorporated by reference into, and made a part of, these Terms. If you have a Business Account, the Business Terms provided below apply to you.
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align="right">
          7.
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography align="left">
          <strong>SUGGESTIONS AND IMPROVEMENTS</strong>
          <br />
          By sending us any ideas, suggestions, documents or proposals (“
          <strong>Feedback</strong>
          ”), you agree that (i) your Feedback does not contain any third party confidential or proprietary information, (ii) we are under no obligation of confidentiality, express or implied, with respect to the Feedback, (iii) we may have something similar to the Feedback already under consideration or in development, (iv) we have no obligation to review, consider, or implement the Feedback, or to return to you all or part of the Feedback, and (v) you grant us an irrevocable, non-exclusive, royalty-free, perpetual, worldwide, assignable, sublicensable, transferable license to use, modify, prepare derivative works of, publish, distribute and sublicense the Feedback, and you irrevocably waive, and cause to be waived, against Lavender Book and its users any claims and assertions of any moral rights contained in such Feedback.
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align="right">
          8.
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography align="left">
          <strong>THIRD PARTY CONTENT AND SERVICES</strong>
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          A.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          The Service may host Third Party Content, or include links to other websites or applications (each, a “
          <strong>Third Party Service</strong>
          ”). We do not control or endorse any Third Party Content or Third Party Service. You agree that we are not responsible for the availability, accuracy, or content of any such Third Party Content or Third Party Service. Your use of and reliance on any Third Party Content or Third Party Service is at your own risk.
          Some of the services made available through the Service and Third Party Services may be subject to additional third party terms of service, privacy policies, licensing terms and disclosures, and other terms, conditions, and policies, including without limitation the ones posted
          {' '}
          <a href="https://www.yelp.com/static?p=thirdpartyterms">here</a>
          . It is your responsibility to familiarize yourself with any such applicable third party terms.
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align="right">
          9.
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography align="left">
          <strong>INDEMNITY</strong>
          <br />
          You agree to indemnify, defend, and hold harmless Lavender Book, its parents, subsidiaries, affiliates, any related companies, suppliers, licensors and partners, and the officers, directors, employees, agents, contractors and representatives of each of them (collectively, the “
          <strong>Lavender Book Entities</strong>
          ”) from  and against any and all third party claims, actions, demands, losses, damages, costs, liabilities and expenses (including but not limited to attorneys’ fees and court costs)  arising out of or relating to: (i) your access to or use of the Service, including Your Content, (ii) your violation of the Terms, (iii) your breach of your representations and warranties provided under these Terms, (iv) any products or services purchased or obtained by you in connection with the Service, (v) your products or services, or the marketing or provision thereof to end users, or (vi) the infringement by you, or any third party using your Account, of any intellectual property or other right of any person or entity. Lavender Book reserves the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us and you agree to cooperate with our defense of these claims. You agree not to settle any such matter without the prior written consent of Lavender Book. Lavender Book will use reasonable efforts to notify you of any such claim, action or proceeding upon becoming aware of it.
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align="right">
          10.
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography align="left">
          <strong>
            DISCLAIMERS AND LIMITATIONS OF LIABILITY
            PLEASE READ THIS SECTION CAREFULLY SINCE IT LIMITS THE LIABILITY OF THE Lavender Book ENTITIES TO YOU. EACH OF THE SUBSECTIONS BELOW ONLY APPLIES UP TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW. NOTHING HEREIN IS INTENDED TO LIMIT ANY RIGHTS YOU MAY HAVE WHICH MAY NOT BE LAWFULLY LIMITED. BY ACCESSING OR USING THE SERVICE, YOU REPRESENT THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO THESE TERMS, INCLUDING THIS SECTION. YOU ARE GIVING UP SUBSTANTIAL LEGAL RIGHTS BY AGREEING TO THESE TERMS.
          </strong>
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          A.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography>
          THE SERVICE AND SERVICE CONTENT ARE MADE AVAILABLE TO YOU ON AN “AS IS”, “WITH ALL FAULTS” AND “AS AVAILABLE” BASIS, WITH THE EXPRESS UNDERSTANDING THAT THE Lavender Book ENTITIES MAY NOT MONITOR, CONTROL, OR VET USER CONTENT OR THIRD PARTY CONTENT. AS SUCH, YOUR USE OF THE SERVICE IS AT YOUR OWN DISCRETION AND RISK. THE Lavender Book ENTITIES MAKE NO CLAIMS OR PROMISES ABOUT THE QUALITY, COMPLETENESS, ACCURACY, OR RELIABILITY OF THE SERVICE, ITS SAFETY OR SECURITY, INCLUDING WITHOUT LIMITATION THE SECURITY OF YOUR DATA, OR THE SERVICE CONTENT. ACCORDINGLY, THE Lavender Book ENTITIES ARE NOT LIABLE TO YOU FOR ANY PERSONAL INJURY, LOSS OR DAMAGE THAT MIGHT ARISE, FOR EXAMPLE, FROM THE SERVICE’S INOPERABILITY, DEPLETION OF BATTERY POWER OR OTHER IMPAIRMENT OF DEVICES USED TO ACCESS THE SERVICE, SERVICE UNAVAILABILITY, SECURITY VULNERABILITIES OR FROM YOUR RELIANCE ON THE QUALITY, ACCURACY, OR RELIABILITY OF THE BUSINESS LISTINGS, RATINGS, REVIEWS (INCLUDING THEIR CONTENT OR OMISSION OF CONTENT, ORDER, AND DISPLAY), METRICS OR OTHER CONTENT FOUND ON, USED ON, OR MADE AVAILABLE THROUGH THE SERVICE.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          B.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography>
          THE Lavender Book ENTITIES MAKE NO CLAIMS OR PROMISES WITH RESPECT TO ANY THIRD PARTY, SUCH AS THE BUSINESSES OR ADVERTISERS LISTED ON THE SERVICE OR THAT OFFER GOODS OR SERVICES THROUGH THE SERVICE, OR THE SERVICE’S USERS. ACCORDINGLY, THE Lavender Book ENTITIES ARE NOT LIABLE TO YOU FOR ANY PERSONAL INJURY, LOSS OR DAMAGE THAT MIGHT ARISE FROM ANY SUCH THIRD PARTY’S ACTIONS OR OMISSIONS, INCLUDING, FOR EXAMPLE, IF ANOTHER USER OR BUSINESS MISUSES YOUR CONTENT, IDENTITY OR PERSONAL INFORMATION, OR IF YOU HAVE A NEGATIVE EXPERIENCE WITH ONE OF THE BUSINESSES OR ADVERTISERS LISTED OR FEATURED ON THE SERVICE. YOUR PURCHASE AND USE OF PRODUCTS OR SERVICES OFFERED BY THIRD PARTIES THROUGH THE SERVICE IS AT YOUR OWN DISCRETION AND RISK.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          C.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography>
          YOUR SOLE AND EXCLUSIVE RIGHT AND REMEDY IN CASE OF DISSATISFACTION WITH THE SERVICE, RELATED SERVICES, OR ANY OTHER GRIEVANCE SHALL BE YOUR TERMINATION AND DISCONTINUATION OF ACCESS TO, OR USE OF THE SERVICE.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          D.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography>
          THE Lavender Book ENTITIES’ MAXIMUM AGGREGATE LIABILITY TO YOU FOR LOSSES OR DAMAGES THAT YOU SUFFER IN CONNECTION WITH THE SERVICE OR THESE TERMS IS LIMITED TO THE GREATER OF (i) THE AMOUNT PAID, IF ANY, BY YOU TO THE Lavender Book ENTITIES IN CONNECTION WITH THE SERVICE IN THE 12 MONTHS PRIOR TO THE ACTION GIVING RISE TO LIABILITY, OR (ii) $100.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          E.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography>
          THE Lavender Book ENTITIES’ LIABILITY SHALL BE LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE Lavender Book ENTITIES WILL NOT BE LIABLE FOR ANY (i) INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, EXEMPLARY, RELIANCE, OR CONSEQUENTIAL DAMAGES, (ii) LOSS OF PROFITS OR REVENUE, (iii) BUSINESS INTERRUPTION, (iv) REPUTATIONAL HARM, (v) LOSS OF INFORMATION OR DATA; OR (vi) LIABILITY WITH RESPECT TO A CONSUMER ALERT POSTED ON ANY Lavender Book BUSINESS PAGES FOR YOUR BUSINESS. THE WAIVERS AND LIMITATIONS SPECIFIED IN THIS SECTION 12 WILL SURVIVE AND APPLY REGARDLESS OF THE FORM OF ACTION, WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY OR OTHERWISE.
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align="right">
          11.
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography align="left">
          <strong>ARBITRATION, DISPUTES, AND CHOICE OF LAW</strong>
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          A.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography>
          If you are a resident of the United States or Canada:
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          i.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography>
          EXCEPT FOR EXCLUDED CLAIMS: ANY CLAIM, CAUSE OF ACTION, REQUEST FOR RELIEF OR DISPUTE THAT MIGHT ARISE BETWEEN YOU AND LAVENDER (“
          <strong>CLAIMS</strong>
          ”) MUST BE RESOLVED BY ARBITRATION ON AN INDIVIDUAL BASIS; YOU AND WE AGREE THAT EACH MAY BRING OR PARTICIPATE IN CLAIMS AGAINST THE OTHER ONLY IN OUR RESPECTIVE INDIVIDUAL CAPACITIES, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. UNLESS BOTH YOU AND Lavender Book AGREE OTHERWISE, THE ARBITRATOR MAY NOT CONSOLIDATE OR JOIN THE CLAIMS OF OTHER PERSONS OR PARTIES WHO MAY BE SIMILARLY SITUATED, AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A REPRESENTATIVE OR CLASS PROCEEDING. YOU AND Lavender Book EXPRESSLY WAIVE THE RIGHT TO TRIAL BY A JURY.
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          ii.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography>
          “
          <strong>EXCLUDED CLAIMS</strong>
          ” means: (a) Claims brought by you or Lavender Book that could be brought in small claims court, if permitted by the rules of that court, or (b) Claims related to intellectual property (like copyrights and trademarks), violations of Lavender Book’s API Terms of Use (which, for clarity, are governed by those terms), or a breach of Section 5 above (Representations and Warranties). Excluded Claims may be brought in court. Any issues relating to the scope and enforceability of the arbitration provision will be resolved by the arbitrator. If any Claim cannot be arbitrated in accordance with this provision, then only that Claim may be brought in court and all other Claims remain subject to arbitration.
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          iii.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography>
          Excluded Claims and Claims that cannot be arbitrated must be brought in court. New York law will govern these Terms (to the extent not preempted or inconsistent with federal law), as well as any such Excluded Claim or Claim that cannot be arbitrated, without regard to conflict of law provisions. You or Lavender Book may seek relief in any small claims court of competent jurisdiction. All other Excluded Claims and Claims that cannot be arbitrated are subject to the exclusive jurisdiction in, and the exclusive venue of, the state and federal courts located within New York County, New York and you consent to the personal jurisdiction of these courts for the purpose of litigating any such Claim.
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          iv.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography>
          Arbitration shall be administered by the American Arbitration Association (“AAA”) in accordance with its
          {' '}
          <a href="https://www.adr.org/sites/default/files/Consumer%20Rules.pdf">Consumer Arbitratoin Rules</a>
          {' '}
          then in effect. For more information, visit
          {' '}
          <a href="http://www.adr.org/">www.adr.org</a>
          . Arbitration may be conducted in person, through the submission of documents, by phone or online. The arbitrator may award damages to you individually as a court could, including declaratory or injunctive relief, but only to the extent required to satisfy your individual claim.
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align="right">
          iii.
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography>
          If the arbitrator finds the arbitration was frivolous or brought for improper purpose, or if the arbitrator finds in favor of Lavender Book, then Lavender Book will seek costs for filing, AAA, and arbitrator’s fees and expenses, as well as attorney’s fees.
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography align="right">
          12.
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Typography align="left">
          <strong>GENERAL TERMS</strong>
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          A.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          We reserve the right to modify, update, or discontinue the Service at our sole discretion, at any time, for any or no reason, and without notice or liability.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          B.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          Except as otherwise stated in Section 8 above, nothing herein is intended, nor will be deemed, to confer rights or remedies upon any third party.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          C.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          The Terms contain the entire agreement between you and us regarding the use of the Service, and supersede any prior agreement between you and us on such subject matter. The parties acknowledge that no reliance is placed on any representation made but not expressly contained in these Terms.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          D.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          Any failure on Lavender Book’s part to exercise or enforce any right or provision of the Terms does not constitute a waiver of such right or provision. The failure of either party to exercise in any respect any right provided for herein shall not be deemed a waiver of any further rights hereunder. The Terms may not be waived, except pursuant to a writing executed by Lavender Book.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          E.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          If any provision of the Terms is found to be unenforceable or invalid by an arbitrator or court of competent jurisdiction, then only that provision shall be modified to reflect the parties’ intention or eliminated to the minimum extent necessary so that the Terms shall otherwise remain in full force and effect and enforceable.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          F.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          The Terms, and any rights or obligations hereunder, are not assignable, transferable or sublicensable by you except with Lavender Book prior written consent, but may be assigned or transferred by us without restriction. Any attempted assignment by you shall violate these Terms and be void.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          G.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          You agree that no joint venture, partnership, employment, agency, special or fiduciary relationship exists between you and Lavender Book as a result of these Terms or your use of the Service.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography align="right">
          H.
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography align="left">
          The section titles in the Terms are for convenience only and have no legal or contractual effect.
        </Typography>
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(TermsOfService);
