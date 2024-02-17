import { MissingFieldsHelper } from '@/shared/helper'
import { BaseEntity } from './base.entity'
import { DomainError } from './domain-error.entity'

interface CreateFileDTO {
  id?: string
  name: string
  size: number
  encoding: string
  type: string
  extension: string
  userId: string
  folderId: string
  mainFolderId: string
  url?: string
  isDeleted?: boolean
  createdAt?: string
  updatedAt?: string
}

export class File extends BaseEntity {
  name: string
  size: number
  encoding: string
  type: string
  extension: string
  userId: string
  folderId: string
  mainFolderId: string
  isDeleted?: boolean
  url?: string | null
  createdAt: string | null
  updatedAt: string | null

  constructor(data: CreateFileDTO) {
    super(data.id)
    this.name = data.name
    this.size = data.size
    this.encoding = data.encoding
    this.type = data.type
    this.extension = data.extension
    this.userId = data.userId
    this.url = data.url ?? null
    this.isDeleted = data.isDeleted ?? false
    this.folderId = data.folderId
    this.mainFolderId = data.mainFolderId
    this.createdAt = data.createdAt ?? null
    this.updatedAt = data.updatedAt ?? null

    this.validate()
  }

  private validate() {
    const missingFieldsValidation = MissingFieldsHelper.hasMissingFields(
      ['name', 'size', 'extension', 'userId', 'type', 'encoding', 'folderId', 'mainFolderId'],
      this
    )

    if (missingFieldsValidation.isMissing) {
      throw new DomainError(missingFieldsValidation.message)
    }

    if (this.size < 0) {
      throw new DomainError('Size should be greater than 0')
    }
  }
}
