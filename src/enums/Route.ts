export enum AuthRoute {
  LOGIN = '/login',
}

export enum CourseRoute {
  CREATE = '/curso/novo',
  EDIT = '/curso/:code/editar',
  LIST = '/curso',
}

export enum DisciplineRoute {
  CREATE = '/disciplina/novo',
  EDIT = '/disciplina/:code/editar',
  LIST = '/disciplina',
  SCHEDULE = '/disciplina/horario',
}

export enum TeacherRoute {
  CREATE = '/professor/novo',
  EDIT = '/professor/:siape/editar',
  LIST = '/professor',
}

export enum SemesterRoute {
  CREATE = '/semestre/novo',
  EDIT = '/semestre/:id/editar',
  LIST = '/semestre',
}

export enum UserRoute {
  CREATE = '/usuario/novo',
  EDIT = '/usuario/:id/editar',
  LIST = '/usuario',
}

export enum QueueRoute {
  INDEX = '/fila',
}

export enum RestricaoRoute {
  INDEX = '/restricao',
}
