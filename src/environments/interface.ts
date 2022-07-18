export interface Environment {
  production: boolean
  dbUrl: string
  userToken: string
}

export interface Task {
  woAsset: string
  woAssetCurrent: string
  woAssetMain: string
  woAssetSub: string
  woID: number
  woMajorEQ: string
  woStatus: string
  woTaskAssetCountID: number
  woTaskAssetID: number
  woTaskAssetMainID: number
  woTaskAssetSubID: number
  woTaskComment: string
  woTaskCommentCurrent: string
  woTaskCompletedTime: string
  woTaskDelay: number
  woTaskFaultCodeGroupMainID: number
  woTaskGroup: string
  woTaskGroupID: number
  woTaskIsActive: number
  woTaskIsOpen: number
  woTaskMFDS: number
  woTaskMajorEQID: number
  woTaskManHour: number
  woTaskOwnerGroupID: number
  woTaskOwnerID: number
  woTaskParent: number
  woTaskParticle: string
  woTaskParticleCurrent: string
  woTaskParticleID: number
  woTaskPosition: string
  woTaskProcessType: string
  woTaskProcessTypeID: number
  woTaskReported: string
  woTaskReportedByID: number
  woTaskReportedName: string
  woTaskRowNumber: number
  woTaskSerialNumber: string
  woTaskSerialNumberInstall: string
  woTaskSerialNumberRemove: string
  woTaskStatusID: number
  woTaskTargetFinish: Date
  woTaskTimeToStart: Date
  woTaskUID: number
  xxxWoTaskName: string
  xxxWoTaskNameRU: string
  isActive: boolean
}

export interface Combo {
  ID: number
  ComboValue: string  
}

export interface DrobLists {
  [key: string]: Combo [] 
}






