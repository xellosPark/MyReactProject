import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState, useRef  } from 'react';
import { Dropdown, Button } from 'react-bootstrap';

// 콤포넌트는 항상 대문자 시작 
function Item(props) {

  const projects = [
    {
      projectName: 'Project 1',
      period: '23.03.06~24.03.06',
      users: ['Hong Gil-dong', 'Kim Cheol-soo']
    },
    {
      projectName: 'Project 2',
      period: '23.03.06~24.03.06',
      users: ['Hong Gil-dong']
    },

    {
      projectName: 'Project 3',
      period: '23.03.06~24.03.22',
      users: ['Hong Gil']
    },
    // Add more projects as needed
  ];

  // Initialize the selectedProjectName state
  const [selectedProjectName, setSelectedProjectName] = useState(
    projects.length > 0 ? projects[0].projectName : "No Data"
  );

    // Use useRef to keep track of the selected project name
    const selectedProjectRef = useRef(projects[0].projectName);
  

  // Handle selection of a project
  const handleSelect = (eventKey) => {
    const selectedProject = projects.find(project => project.projectName === eventKey);
    if (selectedProject) {
      setSelectedProjectName(selectedProject.projectName);

      selectedProjectRef.current = eventKey;
      console.log(selectedProjectRef.current);
    }


  };

  return (
    <div class="card">
      <img src={props.url} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{props.name}</h5>
        <p class="card-text">
          {props.email} <br></br>- Phone: {props.phone} <br></br>- Website:{" "}
          {props.website}
        </p>
        <div className="d-flex align-items-center">
          <Dropdown
            onSelect={handleSelect}
            className="me-2"
            style={{ flexGrow: 1 }}
          >
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{ width: "100%" }}
            >
              {selectedProjectName}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {projects.map((project, index) => (
                <Dropdown.Item
                  key={index}
                  eventKey={project.projectName}
                  className="d-flex align-items-center justify-content-between"
                >
                  {project.projectName}
                  {selectedProjectName === project.projectName ? (
                    <span className="text-warning  ms-2 fs-3">★</span> // Star for selected item
                  ) : (
                    <span className="text-secondary ms-2 fs-3">☆</span> // Grey star for unselected items
                  )}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

function App() {

  const [users, setUsers] = useState([]);

  useEffect( ()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => setUsers(json))
  }, []); // 데이터 받아오기를 한번만 하게하기 위해서...

  // console.log("user??", users);
  
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      {users.map((user) => (
      <Item 
      name = {user.name}
      email = {user.email}
      phone = {user.phone}
      website = {user.website}
      url = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEyMDdfMjg4%2FMDAxNjcwMzkyNTY2MjEy.ulnbOZ0rIHbU1ZwQCHdmSDsUFZ-4piV9qzLuPDBZ9MQg.H-zUulcZUSl_mVjQuscOGNT7iYokdKMQhJQ1uc1oBPkg.JPEG.kcsgyj6%2F%25B4%25D9%25BF%25EE%25B7%25CE%25B5%25E5.jpeg%25A3%25AD380.jpg&type=a340"
      />))}
    </div>

  );
}

export default App;
