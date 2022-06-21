
//REGULAR USERS
export interface DbUserTeam360 {
    TeamOwnerID: number,
    PartnerID: number,
    Partner: string,
    Check1?: boolean,
    EvalType: number,
    Approved?: boolean,
    Hours: number,
    Reason?: string
}

export interface UserType {
    Type: number
}

export interface User {
    id: number,
    name?: string,
    email?: string,
    AllowEditing?: boolean,
    Status?: number
}

export interface ManageUsers {
    id: number,
    name: string,
    email: string,
    userType: boolean,
    SU_decision: boolean
}
//HUMAN RESOURCES

export interface Complete_Team360 {
    TeamOwnerID?: number,
    TeamOwner?: string,
    PartnerID?: number,
    Partner?: string,
    OwnerCheck?: boolean,
    PartnerCheck?: boolean,
    EvalType?: number,
    EvalTypePartner?:  number,
    Approved?: boolean,
    Hours: number,
    warning?: number,
    HrDecision?: boolean,
    Reason?: string,
    Notification?: Array<NotificationData>,
    conflictStatus: boolean
}

export interface getConflictData {
    owner: number,
    partner: number,
    evalTypeOwner: number,
    evalTypePartner: number,
    RequestType: number
}

export interface NotificationData{
  OwnerName: string, 
  OwnerID: number,
  PartnerID: number,
  EvalType: number,
  Reason: string,
  DateCreated?: string,
  HrResponse: string,
  RequestType: number,
  Status: boolean
}

export interface addNewUser{
  Name: string,
  Email: string,
  IsHR: boolean
}

export interface DashboardData{
  ApprovedTeams: number,
  PendingTeams: number,
  Orphans: number
}

 
// Una notificacion debe tener:
//     Quien la envia
//     A quien va dirigida
//     Tipo de evaluacion en la relacion de quien la envia y quien la recibe
//     Tipo de peticion en la notificacion
//     Estatus de la notificacion(resuelta o no)
//     Respuesta por parte de recursos humanos
//     Fecha de creacion
//     Fecha en la que fue resuelta 

export interface Notification{
    Sender: string, 
    Addressee: string, 
    EvalType: number, 
    RequestType: number, 
    Status: number,
    userComplaint?: string,
    HRresponse?: string, 
    DataCreated: Date, 
    DataSolved?: Date
}

export interface Day{
    date: Date, 
    Notifications?: Array<Notification> 
}