import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@material-ui/core/Button';
import { ReactComponent as SolIcon } from '../../assets/noto_statue-of-liberty.svg';
import { ReactComponent as AtlantaIcon } from '../../assets/noto_peach.svg';
import { ReactComponent as DCIcon } from '../../assets/noto_classical-building.svg';
import { ReactComponent as HoustonIcon } from '../../assets/noto_cactus.svg';
import { ReactComponent as LAIcon } from '../../assets/noto_palm-tree.svg';
import { ReactComponent as CafeIcon } from '../../assets/noto_hot-beverage.svg';
import { ReactComponent as BarberIcon } from '../../assets/noto_barber-pole.svg';
import { ReactComponent as RestaurantIcon } from '../../assets/noto_fork-and-knife-with-plate.svg';
import { ReactComponent as WellnessIcon } from '../../assets/noto_woman-in-lotus-position-dark-skin-tone.svg';
import { ReactComponent as ShoppingIcon } from '../../assets/noto_shopping-bags.svg';
import { ReactComponent as NightlifeIcon } from '../../assets/noto_cocktail-glass.svg';
import Image1 from '../../assets/Rectangle 52.png';
import Image2 from '../../assets/Rectangle 53.png';
import Image3 from '../../assets/Rectangle 54.png';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: '100%',
        flexGrow: 1,
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item>
          <ButtonBase sx={{ width: 379, height: 379 }}>
            <Img alt="black woman smiling at pride" src={Image1} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                fontWeight="bold"
                fontSize="24px"
              >
                The Mission
              </Typography>
              <Typography
                display="block"
                gutterBottom
                variant="subtitle1"
                component="div"
                margin="2px"
              >
                Our mission is to spread the word about spaces where people can
                be themselves. All spaces and reviews are published by Lavender
                Book members.
              </Typography>
              <Button variant="outlined">Add a Space</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            fontWeight="bold"
            fontSize="24px"
          >
            Discover New Spaces
          </Typography>
          <Typography
            display="block"
            gutterBottom
            variant="subtitle1"
            component="div"
          >
            Lavender Book is here whether you are traveling or looking for a new
            local hangout spot.
          </Typography>
          <Grid container spacing={2} direction="row" justify="space-between">
            <Grid item>
              <Button variant="outlined">
                <SolIcon className="sol" />
                NYC
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined">
                <AtlantaIcon className="atlanta" />
                Atlanta
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined">
                <DCIcon className="dc" />
                DC
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined">
                <HoustonIcon className="houston" />
                Houston
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined">
                <LAIcon className="la" />
                LA
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <ButtonBase sx={{ width: 379, height: 379 }}>
            <Img
              alt="stylish black man in front of rainbow wall"
              src={Image3}
            />
          </ButtonBase>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item>
          <ButtonBase sx={{ width: 379, height: 379 }}>
            <Img alt="group of people at pride" src={Image2} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                fontWeight="bold"
                fontSize="24px"
              >
                What types of spaces can I search?
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                Not sure where to start? Use the categories below to narrow your
                search to specific types of spaces.
              </Typography>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={1}
                direction="row"
                margin="2px"
              >
                <Grid item>
                  <Button variant="outlined">
                    <CafeIcon className="cafe" />
                    Coffeeshops
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined">
                    <BarberIcon className="barber" />
                    Barbershops
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined">
                    <RestaurantIcon className="restaurant" />
                    Restaurants
                  </Button>
                </Grid>
              </Grid>

              <Grid
                container
                rowSpacing={1}
                columnSpacing={1}
                direction="row"
                margin="2px"
              >
                <Grid item>
                  <Button variant="outlined">
                    <WellnessIcon className="wellness" />
                    Wellness
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined">
                    <ShoppingIcon className="shopping" />
                    Shopping
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined">
                    <NightlifeIcon className="nightlife" />
                    Nightlife
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
