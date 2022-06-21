export interface User {
    ID: number
    userName: string
    project: string
    projectLead: string
    clientname: string
    hours: number
}

export interface Regular_Team{
    ID: number
    projectName: string
    teamMembers: Array<User>
}

export interface Team360{
    ID: number
    teamOwner: User
    relationships: Array<User>
}