import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Alert,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { Loader, PageTitle } from "../components";
import { AuthConsumer, useSignUpForm } from "../components/core";
import requestClient from "../lib/requestClient";
import { handleApiErrors, isAdmin } from "../lib/utils";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
}));
const marks = [
  {
    value: 1,
    label: "1hr",
  },
  {
    value: 25,
    label: "25hrs",
  },
  {
    value: 40,
    label: "40hrs",
  },
  {
    value: 80,
    label: "80hrs",
  },
];

function valuetext(value) {
  return `${value}hrs`;
}

const CreateStory = ({ history }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { inputs, handleInputChange } = useSignUpForm();

  const createNewStory = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {
      storySummary,
      storyDescription,
      storyType,
      storyComplexity,
      estimatedTime,
      associatedCost,
    } = inputs;

    const payload = {
      summary: storySummary,
      description: storyDescription,
      type: storyType,
      complexity: storyComplexity,
      cost: associatedCost,
      estimatedHrs: estimatedTime,
    };

    setLoading(true);

    const response = await requestClient()
      .post(`/v1/stories`, payload)
      .catch((err) => {
        return err;
      });

    setLoading(false);

    const apiErrors = handleApiErrors(response);

    if (apiErrors) {
      setError(apiErrors);
      return;
    }

    setSuccess(true);
    setTimeout(() => history.push("/stories"), 2000);
  };

  return (
    <AuthConsumer>
      {({ user }) => (
        <Fragment>
          <Container className="create-story">
            <Card>
              {loading && <Loader />}

              <div>
                <form
                  onSubmit={(e) => createNewStory(e)}
                  autoComplete="off"
                  noValidate
                >
                  <CardHeader
                    subheader="The information can be edited"
                    title="Create a story"
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          helperText="Please specify the title"
                          label="Title"
                          id="storySummary"
                          name="storySummary"
                          margin="dense"
                          defaultValue={inputs.storySummary}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          id="storyDescription"
                          name="storyDescription"
                          label="Story"
                          required
                          multiline
                          onChange={handleInputChange}
                          margin="dense"
                          rows={10}
                          defaultValue={inputs.storyDescription}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Type"
                          margin="dense"
                          defaultValue=" "
                          name="state"
                          onChange={handleInputChange}
                          required
                          select
                          // eslint-disable-next-line react/jsx-sort-props
                          variant="outlined"
                        >
                          <option value={"enhancement"}>Enhancement</option>
                          <option value={"bugfix"}>Bugfix</option>
                          <option value={"development"}>Development</option>
                          <option value={"qa"}>QA</option>
                        </TextField>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Complexity"
                          margin="dense"
                          name="state"
                          onChange={handleInputChange}
                          required
                          select
                          // eslint-disable-next-line react/jsx-sort-props
                          SelectProps={{ native: true }}
                          variant="outlined"
                        ></TextField>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Typography id="discrete-slider-always" gutterBottom>
                          Estimated time
                        </Typography>
                        <Slider
                          defaultValue={80}
                          getAriaValueText={valuetext}
                          aria-labelledby="discrete-slider-always"
                          step={10}
                          marks={marks}
                          valueLabelDisplay="on"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Cost in $"
                          margin="dense"
                          name="country"
                          onChange={handleInputChange}
                          required
                          defaultValue=" "
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button color="primary" variant="contained">
                      Create Story
                    </Button>
                  </CardActions>
                </form>
              </div>
            </Card>
          </Container>
        </Fragment>
      )}
    </AuthConsumer>
  );
};

export default withRouter(CreateStory);
