export const shorthands = undefined;

export const up = (pgm) => {
  // membuat user baru untuk menampung catatan lama yang tidak punya owner
  pgm.sql("INSERT INTO users(id, username, password, fullname, created_at, updated_at) VALUES ('old_notes', 'old_notes', 'old_notes', 'old notes', NOW(), NOW())");

  // mengisi nilai owner yang NULL dengan id user baru
  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner IS NULL");

  // menambahkan foreign key pada kolom owner
  pgm.addConstraint('notes', 'fk_notes.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

export const down = (pgm) => {
  // hapus constraint foreign key
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id');

  // kembalikan owner old_notes menjadi NULL
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes'");

  // hapus user old_notes
  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};