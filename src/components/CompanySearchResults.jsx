import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Job from "./Job";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const CompanySearchResults = () => {
  const [jobs, setJobs] = useState([]);
  const params = useParams();

  const dispatch = useDispatch();
  const favContent = useSelector((state) => state.favourite.content);

  const baseEndpoint =
    "https://strive-benchmark.herokuapp.com/api/jobs?company=";

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      const response = await fetch(baseEndpoint + params.companyName);
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
        console.log(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h2 className="mt-3">{params.companyName}</h2>
      <Button
      className="mt-5"
        color="danger"
        onClick={() => {
          dispatch({
            type: "ADD_TO_FAV",
            payload: params.companyName,
          });
        }}
      >
        ADD
      </Button>
      <Row>
        <Col>
          {jobs.map((jobData) => (
            <Job key={jobData._id} data={jobData} />
          ))}
        </Col>
      </Row>
      {console.log(favContent)}
      <Link to="/" id="home-link">
        <Button className="mt-5">Home</Button>
      </Link>
    </Container>
  );
};

export default CompanySearchResults;