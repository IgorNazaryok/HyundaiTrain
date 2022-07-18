import { Component, HostListener, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Combo, DrobLists, Task } from 'src/environments/interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tasks-board-page',
  templateUrl: './tasks-board-page.component.html',
  styleUrls: ['./tasks-board-page.component.scss']
})
export class TasksBoardPageComponent implements OnInit { 

  body = {
    description: "",
    position: "",
    serialNumber: "",
    personId: 0,
    woId: 96726,
    startTime: "1900-01-01",
    endTime: "3000-01-01",
    key: environment.userToken,
    trainIDs: [],
    carIDs: [],
    statusIDs: [],
    majorEQIDs: [],
    assetIDs: [],
    processTypeIDs: []
  }

  tasks: Task[] = []
  idActiveTask: number|null = null
  DrobLists: DrobLists = {}
  isLoadedAssets: number[] = []
  destroy$ = new Subject();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getTasks()
    this.getValueBox()
  }

  ngOnDestroy(): void {    
    this.destroy$.next(true)
    this.destroy$.complete()
  }

  @HostListener('window:click', ['$event'])
  deactivateTask() {
    if (this.idActiveTask) {
      this.tasks.find(task => task.woTaskUID === this.idActiveTask)!.isActive = false
      this.idActiveTask = null
    }        
  }

  getTasks():void {
    this.http.post<Task[]>(`${environment.dbUrl}/tasks/CreateTasksFiltered`, this.body)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((data)=> {    
      this.tasks = data.map(
        task => {
          if (!this.isLoadedAssets.includes(task.woTaskMajorEQID)) {
            this.isLoadedAssets.push(task.woTaskMajorEQID)
            this.getAsset(task.woTaskMajorEQID) 
          }
          return {
            ...task,
            isActive: false         
          }
      })
    })
  }

  getValueBox():void {
    const listComboName = ['Status', 'AssetMain', 'AssetSub', 'MajorEQs', 'ProcessTypes']

    listComboName.forEach((value:string) => {
      this.http.get<Combo[]>(`${environment.dbUrl}/combo-box/GetByKey?keyValue=${value}&key=${environment.userToken}`)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((data)=>{                
        this.DrobLists[value] = data        
      })            
    })        
  }

  updateAsset(majorId:number, id: number):void {
    this.tasks.find(task => task.woTaskUID === id)!.woTaskMajorEQID = majorId    
    this.getAsset(majorId)
  }

  getAsset(majorId:number):void {
    const headers = new HttpHeaders({
      'ApiKey':
      'VisionKeyAPI-7854759485:jiqbvsaipwheqphewuipfbjdsv0iejbapdjvbweoibfpjbacvehpbqjsadbvcapihgqpbvdjsajbfqpeubdvxczape0q9'
    })    

    this.http.get<any[]>(`http://176.88.169.230:5000/api/Asset/GetAssetFromMajor/${majorId}?key=${environment.userToken}`, { headers })
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((data)=> {
      this.DrobLists[majorId] = data.map(
        ({
          itemUID:ID,
          itemDescription:ComboValue       
          }) => ({
            ID,
            ComboValue     
            }))   
    })    
  }

  activateTask(id: number, event: Event) {
    this.deactivateTask()
    this.idActiveTask = id
    let active = this.tasks.find(task => task.woTaskUID === id)!
    active.isActive = !active.isActive
    event.stopPropagation()
  }    
  
  onClick(isActive: boolean, event: Event) {    
    if (isActive) event.stopPropagation()
  }
}
