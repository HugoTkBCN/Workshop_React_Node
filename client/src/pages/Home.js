import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { withStyles } from "@mui/styles";
import TeamInfos from "../components/TeamInfos";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const styles = (theme) => ({
  input: {
    height: 40,
  },
  button: {
    height: 40,
  },
  selectRoot: {
    height: 40,
    display: "table",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
  select: {
    height: 40,
    paddingTop: 0,
    paddingBottom: 0,
    display: "table-cell",
    verticalAlign: "middle",
  },
});

const Home = withStyles(styles)((props) => {
  const { classes, team, setTeam } = props;
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("team")) {
      navigate("/login");
    } else {
      getTeam(JSON.parse(localStorage.getItem("team")));
    }
  }, []);

  const getIsAdmin = (team) => {
    axios
      .get("http://localhost:8080/api/teams/isAdmin/" + team.id)
      .then((response) => {
        setIsAdmin(response.data.isAdmin);
        if (response.data.isAdmin) getTeams();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getTeams = () => {
    axios
      .get("http://localhost:8080/api/teams/get/")
      .then((response) => {
        setTeams(response.data.teams);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getTeam = (team) => {
    axios
      .get("http://localhost:8080/api/teams/get/" + team.id)
      .then((response) => {
        updateTeam(response.data);
        getIsAdmin(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onDeleteTeam = (team) => {
    axios
      .delete("http://localhost:8080/api/teams/delete/" + team.id)
      .then((response) => {
        if (response.data.success)
          removeTeamFromTeams(team)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateTeam = (team) => {
    localStorage.setItem("team", JSON.stringify(team));
    setTeam(team);
  };

  const updateTeams = (team) => {
    var foundIndex = teams.findIndex((x) => x.id == team.id);
    var tmp = [...teams];
    tmp[foundIndex] = team;
    setTeams(tmp);
  };

  const removeTeamFromTeams = (team) => {
    var tmp = [...teams];
    setTeams(tmp.filter((obj) => obj.id !== team.id));
  }

  return (
    <div
      style={{
        marginTop: 100,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <TeamInfos team={team} setTeam={updateTeam} />
      {isAdmin && teams && (
        <div>
          <Typography variant="h3" style={{marginBottom: 30}}>Teams :</Typography>
          {teams.map((item, index) => {
            if (item.id != team.id)
              return (
                <div key={index} style={{marginBottom: 30}}>
                  <div style={{display: "flex", flexDirection: "row"}}>
                    <Typography variant={"h4"} style={{ marginBottom: 40, marginRight: 20}}>
                      {item.name}
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      className={classes.button}
                      size="large"
                      onClick={() =>  onDeleteTeam(item)}
                    >Delete</Button>
                  </div>
                  <TeamInfos team={item} setTeam={updateTeams} />
                  <Divider/>
                </div>
              );
          })}
        </div>
      )}
    </div>
  );
});

export default Home;
