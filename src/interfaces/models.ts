export interface UserModel {
  email: string
  id: number
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  last_login: string
  first_name: string
  last_name: string
}

export interface GrupoModel {
  id: number
  name: string
}

export interface PermissionsModel {
  codename: string
  model: string
}

export interface ConceptoModel {
  id: number
  nombre: string
  codigo: string
  precio: number
  is_active: boolean
  programa?: number
}
export interface PagoModel {
  id: number
  nombre_cliente: string
  numero_documento: string
  numero_operacion: string
  fecha_operacion: string
  monto: Number
  is_active: boolean
  concepto: number
  is_conciliado: boolean
  concepto_nombre: string
}
export interface ProgramaModel {
  id: number
  codigo: string
  nombre: string
  is_active: boolean
  tipo: number
  facultad: number
}
