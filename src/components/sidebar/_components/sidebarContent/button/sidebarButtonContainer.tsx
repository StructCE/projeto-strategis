"use client"
import {
  type UseSideBarButtonReturn,
  useSidebarButtons,
} from "./useSidebarButton";
import React from "react";

type SidebarButtonContainerProps = {
  children: (props: UseSideBarButtonReturn) => React.ReactNode[];
};

export default function SidebarButtonContainer(
  props: SidebarButtonContainerProps,
) {
  const sidebarButtons = useSidebarButtons();
  return <props.children {...sidebarButtons}></props.children>;
}
