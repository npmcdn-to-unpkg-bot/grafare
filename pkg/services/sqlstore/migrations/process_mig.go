package migrations

import  ."github.com/grafana/grafana/pkg/services/sqlstore/migrator"

func addProcessMigrations(mg *Migrator)  {

  processV1:= Table{
    Name: "process",
    Columns: []*Column{
      {Name: "process_id", Type: DB_BigInt, Length: 20,IsPrimaryKey: true, IsAutoIncrement: true,Nullable: true},
      {Name: "process_name", Type: DB_NVarchar,  Length: 255, Nullable: true},
      {Name: "org_id", Type: DB_BigInt,Length: 20,  Nullable: true},
      {Name: "parent_process_name", Type: DB_NVarchar,  Length: 255, Nullable: false},
      {Name: "created", Type: DB_DateTime,Nullable: false},
      {Name: "updated", Type: DB_DateTime,Nullable: false},
      {Name: "updated_by", Type: DB_NVarchar, Length: 45, Nullable: true},
    },
    Indices: []*Index{
      {Cols: []string{"process_id"}, Type: IndexType},
      {Cols: []string{"org_id"}, Type: IndexType},
      {Cols: []string{"parent_process_name"}, Type: IndexType},
      {Cols: []string{"updated_by"}, Type: IndexType},
    },

  }
  mg.AddMigration("create process  table v1-7", NewAddTableMigration(processV1))
  addTableIndicesMigrations(mg, "v1-7", processV1)

  addDropAllIndicesMigrations(mg, "v2", processV1)

  addTableRenameMigration(mg, "process", "process_v2", "v2")

  processV2:= Table{
    Name: "process",
    Columns: []*Column{
      {Name: "process_id", Type: DB_BigInt, Length: 20,IsPrimaryKey: true, IsAutoIncrement: true,Nullable: true},
      {Name: "process_name", Type: DB_NVarchar,  Length: 255, Nullable: true},
      {Name: "org_id", Type: DB_BigInt,Length: 20,  Nullable: true},
      {Name: "parent_process_name", Type: DB_NVarchar,  Length: 255, Nullable: false},
      {Name: "created", Type: DB_DateTime,Nullable: false},
      {Name: "updated", Type: DB_DateTime,Nullable: false},
      {Name: "updated_by", Type: DB_NVarchar, Length: 45, Nullable: true},
      {Name: "parent_process_id", Type: DB_BigInt,Length: 20,  Nullable: true},
    },
    Indices: []*Index{
      {Cols: []string{"process_id"}, Type: IndexType},
      {Cols: []string{"org_id"}, Type: IndexType},
      {Cols: []string{"parent_process_name"}, Type: IndexType},
      {Cols: []string{"updated_by"}, Type: IndexType},
      {Cols: []string{"parent_process_id"}, Type: IndexType},
    },

  }

  mg.AddMigration("create process table v2", NewAddTableMigration(processV2))
  addTableIndicesMigrations(mg, "v3", processV2)
  mg.AddMigration("copy data_source v2 to v3", NewCopyTableDataMigration("process", "process_v2", map[string]string{
    "process_id":             "process_id",
    "process_name":        "process_name",
    "org_id":          "org_id",
    "parent_process_name":          "parent_process_name",
    "created":           "created",
    "updated":       "updated",
    "updated_by":           "updated_by",
    "parent_process_id":          "parent_process_id",

  }))

  mg.AddMigration("Drop old table user_v2", NewDropTableMigration("process_v2"))

}
