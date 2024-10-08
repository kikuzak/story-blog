import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const ArticleScalarFieldEnumSchema = z.enum(['id','class_number','article_category_id','region_id','country_id','period_id','prefecture_id','old_prefecture_id','author_id','source_category_id','source','title','kana','content','created_at','updated_at','status','published_at']);

export const ArticleCategoryMasterScalarFieldEnumSchema = z.enum(['id','name']);

export const RegionMasterScalarFieldEnumSchema = z.enum(['id','name']);

export const CountryMasterScalarFieldEnumSchema = z.enum(['id','kana','name']);

export const PeriodMasterScalarFieldEnumSchema = z.enum(['id','name']);

export const PrefectureMasterScalarFieldEnumSchema = z.enum(['id','name']);

export const OldPrefectureMasterScalarFieldEnumSchema = z.enum(['id','name']);

export const AuthorScalarFieldEnumSchema = z.enum(['id','kana','name']);

export const SourceCategoryMasterScalarFieldEnumSchema = z.enum(['id','name']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ARTICLE SCHEMA
/////////////////////////////////////////

export const ArticleSchema = z.object({
  id: z.number().int(),
  class_number: z.string().nullable(),
  article_category_id: z.number().int().nullable(),
  region_id: z.number().int().nullable(),
  country_id: z.number().int().nullable(),
  period_id: z.number().int().nullable(),
  prefecture_id: z.number().int().nullable(),
  old_prefecture_id: z.number().int().nullable(),
  author_id: z.number().int().nullable(),
  source_category_id: z.number().int().nullable(),
  source: z.string().nullable(),
  title: z.string(),
  kana: z.string(),
  content: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  status: z.number().int(),
  published_at: z.coerce.date().nullable(),
})

export type Article = z.infer<typeof ArticleSchema>

/////////////////////////////////////////
// ARTICLE CATEGORY MASTER SCHEMA
/////////////////////////////////////////

export const ArticleCategoryMasterSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type ArticleCategoryMaster = z.infer<typeof ArticleCategoryMasterSchema>

/////////////////////////////////////////
// REGION MASTER SCHEMA
/////////////////////////////////////////

export const RegionMasterSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type RegionMaster = z.infer<typeof RegionMasterSchema>

/////////////////////////////////////////
// COUNTRY MASTER SCHEMA
/////////////////////////////////////////

export const CountryMasterSchema = z.object({
  id: z.number().int(),
  kana: z.string(),
  name: z.string(),
})

export type CountryMaster = z.infer<typeof CountryMasterSchema>

/////////////////////////////////////////
// PERIOD MASTER SCHEMA
/////////////////////////////////////////

export const PeriodMasterSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type PeriodMaster = z.infer<typeof PeriodMasterSchema>

/////////////////////////////////////////
// PREFECTURE MASTER SCHEMA
/////////////////////////////////////////

export const PrefectureMasterSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type PrefectureMaster = z.infer<typeof PrefectureMasterSchema>

/////////////////////////////////////////
// OLD PREFECTURE MASTER SCHEMA
/////////////////////////////////////////

export const OldPrefectureMasterSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type OldPrefectureMaster = z.infer<typeof OldPrefectureMasterSchema>

/////////////////////////////////////////
// AUTHOR SCHEMA
/////////////////////////////////////////

export const AuthorSchema = z.object({
  id: z.number().int(),
  kana: z.string(),
  name: z.string(),
})

export type Author = z.infer<typeof AuthorSchema>

/////////////////////////////////////////
// SOURCE CATEGORY MASTER SCHEMA
/////////////////////////////////////////

export const SourceCategoryMasterSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type SourceCategoryMaster = z.infer<typeof SourceCategoryMasterSchema>
