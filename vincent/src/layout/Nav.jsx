import React from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();

  const items = [
    MenuItem("Welcome", "/"),
    SubMenu("Case Management", [
      MenuItem("Create case", "/case/create"),
      MenuItem("In-progress cases", "/case/inprogress"),
      MenuItem("Archive", "/case/archive"),
    ]),
    SubMenu("Question Management",[
      MenuItem("Question list", "/question/list"),
      MenuItem("Add new question", "/question/create"),
      MenuItem("Import questions", "/question/import"),
      MenuItem("Category list", "/category/list"),
    ]),
    SubMenu("Question Set Management", [
      MenuItem("Add new question set", "/questionset/create"),
      MenuItem("Question set list", "/questionset/list"),
    ]),
    SubMenu("Industry Management", [
      MenuItem("Industry list", "/industry/list"),
    ])
  ];

  return (
    <nav style={{ height: "100%", overflowY: "auto" }}>
      <h1 style={{ textAlign: "center", color: "white", margin: "10px auto" }}>
        Vincents Admin
      </h1>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
      />
    </nav>
  );
}

function SubMenu(name, children) {
  return {
    key: name,
    label: name,
    children: children
  }
}

function MenuItem(name, path) {
  return {
    key: path,
    label: <NavLink to={path}>{name}</NavLink>
  }
}
