import React, { useState } from "react";
import "./TeamProjectTableSub.css";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const TeamProjectBoard = ({ posts }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [projectAdd, setProjectAdd] = useState(false);
  const [projectEdit, setProjectEdit] = useState(false);
  const [projectData, setProjectData] = useState({
    part: "",
    name: "",
    startMonth: "",
    endMonth: "",
    months: "",
    users: "",
    state: "",
    desc: "",
  });
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: '',
    x: 0,
    y: 0
  });

  const months = [
    "1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"
  ];

  const headers = [
    "순번","프로젝트명","파트","상태","인 원","진행률",...months,"이슈 및 비교","수정"
  ];

  const states = [
    "Setup","Production Setup","Initiation","Development","Planning","Testing"
  ];

  const handleCheckboxChange = (index) => {
    setSelectedRow(index);
  };

  const handleCreate = () => {
    setProjectAdd(!projectAdd);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddRow = async () => {
    if (true) {
      const newRow = {
        Project: projectData.name,
        Part: projectData.part,
        StartMonth: projectData.startMonth,
        EndMonth: projectData.endMonth,
        Months: projectData.months,
        Users: projectData.users,
        State: projectData.state,
        Desc: projectData.desc,
      };

      setProjectData({
        part: "",
        name: "",
        startMonth: "",
        endMonth: "",
        months: "",
        users: "",
        state: "",
        desc: "",
      });
      setProjectAdd(false);
    } else {
      alert("입력하지 않은 항목이 존재합니다.");
    }
  };

  const handleEditRow = async () => {
    if (true) {
      const newRow = {
        Project: projectData.name,
        Part: projectData.part,
        StartMonth: projectData.startMonth,
        EndMonth: projectData.endMonth,
        Months: projectData.months,
        Users: projectData.users,
        State: projectData.state,
        Desc: projectData.desc,
      };

      setProjectData({
        part: "",
        name: "",
        startMonth: "",
        endMonth: "",
        months: "",
        users: "",
        state: "",
        desc: "",
      });
      setProjectAdd(false);
    } else {
      alert("입력하지 않은 항목이 존재합니다.");
    }
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const handleEdit = (row) => {
    console.log("project", row);
    if (projectEdit) {
      setProjectEdit(false);
      setSelectedRow(null);
    } else {
      setProjectAdd(false);
      setProjectEdit(true);
    }
  };

  const showTooltip = (content, e) => {
    setTooltip({
      visible: true,
      content,
      x: e.pageX,
      y: e.pageY
    });
  };

  const hideTooltip = () => {
    setTooltip({
      ...tooltip,
      visible: false
    });
  };

  return (
    <div className="project-table-container">
      <div className="Teamtable-counter">
        <span>총 프로젝트: {posts.length}</span>
        <span>
          현재 기준: {currentYear}.{currentMonth}
        </span>
        {!projectEdit && (
          <button className="TeamProjectBoard" onClick={handleCreate}>
            프로젝트 생성
            <i>{projectAdd ? "➖" : "➕"}</i>
          </button>
        )}
      </div>
      {projectAdd && (
        <div>
          <Box sx={{ display: "flex", gap: 2, marginBottom: 2, padding: 1 }}>
            <TextField
              label="Project"
              name="name"
              value={projectData.name}
              onChange={handleInputChange}
            />
            <TextField
              label="Part"
              name="part"
              value={projectData.part}
              onChange={handleInputChange}
            />
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>상태</InputLabel>
              <Select
                name="state"
                value={projectData.state}
                onChange={handleInputChange}
                label="상태"
              >
                {states.map((state, index) => (
                  <MenuItem key={index} value={index}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="투입인원"
              name="users"
              value={projectData.users}
              onChange={handleInputChange}
            />
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>시작</InputLabel>
              <Select
                name="startMonth"
                value={projectData.startMonth}
                onChange={handleInputChange}
                label="시작"
              >
                {months.map((month, index) => (
                  <MenuItem key={index} value={index}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>끝</InputLabel>
              <Select
                name="endMonth"
                value={projectData.endMonth}
                onChange={handleInputChange}
                label="끝"
              >
                {months.map((month, index) => (
                  <MenuItem key={index} value={index}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="진행개월수"
              name="months"
              value={projectData.months}
              onChange={handleInputChange}
            />
            <TextField
              label="이슈 및 보고"
              name="desc"
              value={projectData.desc}
              onChange={handleInputChange}
            />
            <Button variant="contained" onClick={handleAddRow}>
              Add
            </Button>
          </Box>
        </div>
      )}

      {projectEdit && (
        <div>
          <Box sx={{ display: "flex", gap: 2, marginBottom: 2, padding: 1 }}>
            <TextField
              disabled
              label="Project"
              name="name"
              value={projectData.name}
              onChange={handleInputChange}
            />
            <TextField
              label="Part"
              name="part"
              value={projectData.part}
              onChange={handleInputChange}
            />
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>상태</InputLabel>
              <Select
                name="state"
                value={projectData.state}
                onChange={handleInputChange}
                label="상태"
              >
                {states.map((state, index) => (
                  <MenuItem key={index} value={index}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="투입인원"
              name="users"
              value={projectData.users}
              onChange={handleInputChange}
            />
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>시작</InputLabel>
              <Select
                name="startMonth"
                value={projectData.startMonth}
                onChange={handleInputChange}
                label="시작"
              >
                {months.map((month, index) => (
                  <MenuItem key={index} value={index}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>끝</InputLabel>
              <Select
                name="endMonth"
                value={projectData.endMonth}
                onChange={handleInputChange}
                label="끝"
              >
                {months.map((month, index) => (
                  <MenuItem key={index} value={index}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="진행개월수"
              name="months"
              value={projectData.months}
              onChange={handleInputChange}
            />
            <TextField
              label="이슈 및 보고"
              name="desc"
              value={projectData.desc}
              onChange={handleInputChange}
            />
            <Button variant="contained" onClick={handleEditRow}>
              Edit
            </Button>
          </Box>
        </div>
      )}

      <table className="Teamproject-table">
        <thead className="Teamproject-head">
          <tr className="Teamproject-table-header">
            {headers.map((header, index) => (
              <th key={index} className="Teamproject-table-header-cell">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.map((row, index) => (
            <tr key={index} className="Teamproject-table-row">
              <td className="Teamproject-table-cell">{row.no}</td>
              <td className="Teamproject-table-cell">{row.projectName}</td>
              <td className="Teamproject-table-cell">{row.part}</td>
              <td className="Teamproject-table-cell">{row.status}</td>
              <td className="Teamproject-table-cell">{row.personnel}</td>
              <td className="Teamproject-table-cell">
                {row.offense}/{row.defense}
              </td>
              <td className="Teamproject-table-cell" colSpan={row.months}>
                <div
                  className="Teamprogress-bar-container"
                  onMouseEnter={(e) =>
                    showTooltip(`Progress: ${row.progress}%`, e)
                  }
                  onMouseLeave={hideTooltip}
                >
                  <div
                    className="Teamprogress-bar"
                    style={{ width: `${row.progress}%` }}
                  >
                    {row.progress}%
                  </div>
                </div>
              </td>
              {[...Array(12 - row.months)].map((_, idx) => (
                <td key={idx} className="Teamproject-table-cell"></td>
              ))}
              <td className="Teamproject-table-cell">{row.issues}</td>
              <td className="Teamproject-table-cell">
                <Button variant="contained" onClick={() => handleEdit(row)}>
                  수정
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {tooltip.visible && (
        <div
          className="tooltip"
          style={{
            position: 'absolute',
            top: tooltip.y,
            left: tooltip.x,
            backgroundColor: '#333',
            color: '#fff',
            padding: '5px',
            borderRadius: '5px',
            zIndex: 1000,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default TeamProjectBoard;
