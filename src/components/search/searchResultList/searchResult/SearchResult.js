import React from "react";
import PropTypes from "prop-types";
import {
  styled,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Rating,
  Chip,
  CardActionArea,
  Container,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DoneIcon from "@mui/icons-material/Done";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const SearchResult = (props) => {
  const business = props.business;
  const [expanded, setExpanded] = React.useState(false);

  const tags = business.categories.map((category) => (
    <Chip
      key={business.id + category.title}
      label={`# ${category.title}`}
      variant="outlined"
    />
  ));

  const transactions = business.transactions.map((transaction) => (
    <span key={business.id + transaction}>{transaction} </span>
  ));

  const addressLines = business.location.display_address.map((addressLine) => (
    <p key={business.id + addressLine}>{addressLine}</p>
  ));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickingGetDirection = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${business.location.address1}%20${business.location.city}%20${business.location.state}%20${business.location.zip_code}`;
    window.open(url);
  };

  return (
    <Container>
      <Card
        sx={{
          minWidth: 200,
          maxWidth: 345,
        }}
      >
        <CardActionArea
          onClick={() => props.whenSearchResultClicked(business.id)}
        >
          <CardHeader
            avatar={
              <Avatar alt={business.name} src="#" aria-label="business" />
            }
            title={business.name}
            titleTypographyProps={{
              fontWeight: "bold",
            }}
          />
          <CardMedia
            component="img"
            height="194"
            image={business.image_url}
            alt={business.name}
          />
        </CardActionArea>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Rating
              name="rating"
              value={business.rating}
              precision={0.5}
              sx={{ marginRight: "0.5rem" }}
              readOnly
            />
            <p>{business.review_count} Reviews</p>
          </Box>
          <Box>
            {business.location.city} · {business.price}
          </Box>
          <Box display="flex" alignItems="center">
            <DoneIcon color="success" />
            <Box m={1} sx={{ textTransform: "capitalize" }}>
              {transactions}
            </Box>
          </Box>
          <div>{tags}</div>
          <CardActionArea onClick={() => handleClickingGetDirection()}>
            <p>Get Direction</p>
          </CardActionArea>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              paragraph
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              {business.name}
            </Typography>
            <Typography paragraph>
              Business Phone: {business.display_phone}
            </Typography>
            <div>Busines Address: {addressLines}</div>
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
};

SearchResult.propTypes = {
  business: PropTypes.object,
  whenSearchResultClicked: PropTypes.func,
};

export default SearchResult;
