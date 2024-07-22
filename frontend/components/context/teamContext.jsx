"use client";

import { createContext, useContext, useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchTeams = async (accessToken) => {};

const initialState = {
  defaultTeam: null,
  teams: [],
};

const TeamContext = createContext(initialState);

export const TeamProvider = ({ children }) => {
  const [defaultTeam, setDefaultTeam] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // fetch teams
    // we also want this to run whenever the default team changes or when a user leaves a team
  }, [defaultTeam, teams]);

  return (
    <TeamContext.Provider
      value={{ defaultTeam, setDefaultTeam, teams, setTeams }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => useContext(TeamContext);
