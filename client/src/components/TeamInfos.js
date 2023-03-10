import { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { withStyles } from "@mui/styles";
import EditableField from "./EditableField";

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

const TeamInfos = withStyles(styles)((props) => {
  const { classes, team, setTeam } = props;

  const onSaveTeamName = (name) => {
    const body = {
      name: name,
    };
    axios.put("http://localhost:8080/api/teams/updateName/"+team.id, body)
    .then(((response) => {
        setTeam(response.data);
    }))
    .catch((error) => {
        console.error(error);
    });
  }

  const onSaveDescription = (description) => {
    const body = {
      description: description,
    };
    axios.put("http://localhost:8080/api/teams/updateDescription/"+team.id, body)
    .then(((response) => {
        setTeam(response.data);
    }))
    .catch((error) => {
        console.error(error);
    });
  }

  const onSaveRepositoryUrl = (repository) => {
    const body = {
      repository: repository,
    };
    axios.put("http://localhost:8080/api/teams/updateRepository/"+team.id, body)
    .then(((response) => {
        setTeam(response.data);
    }))
    .catch((error) => {
        console.error(error);
    });
  }

  const onDeleteUser = (user) => {
    const body = {
      email: user,
    };

    console.log("http://localhost:8080/api/teams/removeUser/"+team.id, body);
    axios.delete("http://localhost:8080/api/teams/removeUser/"+team.id, { data: body })
    .then(((response) => {
        setTeam(response.data);
    }))
    .catch((error) => {
        console.error(body, error);
    });
  }

  const onUpdateTeamManager = (user) => {
    const body = {
      email: user,
    };
    axios.put("http://localhost:8080/api/teams/updateManager/"+team.id, body)
    .then(((response) => {
        setTeam(response.data);
    }))
    .catch((error) => {
        console.error(error);
    });
  }

  const onAddUser = (user) => {
    const body = {
      email: user,
    };
    axios.post("http://localhost:8080/api/teams/addUser/"+team.id, body)
    .then(((response) => {
        setTeam(response.data);
    }))
    .catch((error) => {
        console.error(error);
    });
  }

  return (
      team && (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "flex-start"}}>
          <EditableField
            style={{marginBottom: 20}}
            label={"Team Name"}
            value={team.name}
            onSave={onSaveTeamName}
          />
          <EditableField
            style={{marginBottom: 20}}
            label={"Description"}
            value={team.description}
            onSave={onSaveDescription}
          />
          <EditableField
            style={{marginBottom: 20}}
            label={"Repository Url"}
            value={team.repository}
            onSave={onSaveRepositoryUrl}
          />
          <EditableField
            label="Team Manager"
            style={{marginBottom: 20}}
            dropdown
            value={team.manager}
            onSave={onUpdateTeamManager}
          >
            {team.users.map((user, index) => 
              <MenuItem key={index} value={user}>{user}</MenuItem>
            )}
          </EditableField>
          <Typography style={{marginBottom: 20}}>Users:</Typography>
          {team.users.map((user, index) => {
            if (user !== team.manager)
              return (
                <EditableField
                  key={index}
                  style={{marginBottom: 20}}
                  value={user}
                  onDelete={onDeleteUser}
                />
              );
          })}
          <EditableField
            style={{marginBottom: 20}}
            label={"Add User"}
            onSave={onAddUser}
            saveButtonText={"Add"}
          />
        </div>
      )
  );
});

export default TeamInfos;
