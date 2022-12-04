import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useApplicationState } from "../hooks/useApplicationData";
import { useParams } from "react-router-dom";
import { getUsersByProjectId } from "../api/user";

export default function TaskTabs() {
  const { id } = useParams(); //Current Project ID(from URL)
  const { projects } = useApplicationState();
  const [projectUsers, setProjectUsers] = useState([]);

  useEffect(() => {
    getUsersByProjectId(id).then((users) => {
      setProjectUsers(users);
    });
  }, [id]);

  const users = projectUsers.map((user) => {
    return (
      <>
      <div>
      <img
      key={user.id}
      src={user.avatar}
      alt={user.name}
      className={"task-list__assigned-users__avatars"}
      /> {user.name}, {user.email}
      </div>
    </>
    );
  });

  //Gets the project object of this task.
  const getCurrentProjectId = (objectArr, projId) => {
    return objectArr.find((project) => String(project.id) === String(projId));
  };
  // we already have 'projects' from useApplicationState and 'id' from useParams
  const currentProject = getCurrentProjectId(projects, id);

  return (
    <Tabs
      defaultActiveKey="details"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="details" title="Project Details">
        <h3 className="task-list__projectName">
          {/* After we got current project name, we display its name. If refresh page, error of undefined could show up because context doesn't have it for now. ? tells web page it could be undefined, so it won't has error */}
          Current Project: {currentProject?.name}
        </h3>
        Start Date: {currentProject.start_date}
        <div>Deadline: {currentProject.expected_end_date}</div>
      </Tab>
      <Tab eventKey="members" title="Members">
        <div className="task-list__project-users">
          Members in this project:
        </div>
          <div className="task-list__avatars-wrapper">{users}</div>

      </Tab>
      <Tab eventKey="files" title="Files">
      </Tab>
      <Tab eventKey="secret" title="Secret" disabled>
      </Tab>
    </Tabs>
  );
}
