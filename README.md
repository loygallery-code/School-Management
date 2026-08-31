# ລະບົບບໍລິຫານຈັດການໂຮງຮຽນ (School Management System)

ອະນຸບານ1-3, ປະຖົມ ປໍ1-6, ມັດທະຍົມຕົ້ນ ມໍ1-3, ມັດທະຍົມປາຍ ມໍ4-6
Stack: **HTML/JS + Supabase + GitHub + Cloudflare Pages**
ພາສາ: ລາວ / English (ສະຫຼັບໄດ້ໃນໜ້າເວັບ)

## ໂຄງສ້າງໂຟນເດີ

```
school-management-system/
├── index.html          ← ໜ້າ "ທະບຽນນັກຮຽນ" (ຂໍ້ມູນນັກຮຽນ + ລົງທະບຽນເຂົ້າຫ້ອງ)
├── sql/
│   └── school-management-schema.sql   ← ໂຄງສ້າງຖານຂໍ້ມູນ Supabase (ຮັນຄັ້ງດຽວຕອນຕັ້ງຄ່າ)
└── README.md
```

## ການຕັ້ງຄ່າ Supabase

1. ສ້າງໂປຣເຈັກໃໝ່ໃນ [supabase.com](https://supabase.com)
2. ໄປ SQL Editor → ວາງເນື້ອຫາຈາກ `sql/school-management-schema.sql` → Run
3. ໄປ Storage → Create bucket ຊື່ `student-photos` → ຕັ້ງເປັນ **Public bucket**
4. ໄປ Project Settings → API → ຄັດລອກ `Project URL` ແລະ `anon public key`
5. ເປີດ `index.html`, ຊອກຫາແຖວ `SUPABASE_URL` ແລະ `SUPABASE_ANON_KEY` ໃນ `<script>` ແລ້ວປ່ຽນເປັນຄ່າຂອງໂປຣເຈັກໃໝ່ (ຖ້າຈະໃຊ້ Supabase ອັນເກົ່າຮ່ວມກັບໂຮງຮຽນນີ້, ບໍ່ຕ້ອງແກ້)

## ການ Deploy ຂຶ້ນ GitHub + Cloudflare Pages

```bash
cd school-management-system
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin <ລິ້ງ GitHub repo ຂອງເຈົ້າ>
git push -u origin main
```

ຈາກນັ້ນໃນ Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → ເລືອກ repo ນີ້ → Build settings ປະໄວ້ຄ່າ default (ບໍ່ຕ້ອງມີ build command ເພາະເປັນ static HTML) → **Save and Deploy**.

ຫຼັງຈາກນັ້ນ ທຸກຄັ້ງທີ່ `git push` ຂຶ້ນ `main`, Cloudflare Pages ຈະ deploy ໃຫ້ອັດຕະໂນມັດ.

## ໂມດູນທີ່ມີແລ້ວ

- **ນັກຮຽນ** (`index.html`): ຟອມເພີ່ມ/ແກ້ໄຂ (ຮູບ 3×4, ຊື່ລາວ/ອັງກິດ, ລະຫັດອັດຕະໂນມັດ), ຕາຕະລາງລາຍຊື່ + ຄົ້ນຫາ/ກອງ, ປະຫວັດນັກຮຽນ, ລົງທະບຽນເຂົ້າຫ້ອງຮຽນ, ນຳເຂົ້າ Excel/ຮູບເປັນຈຳນວນຫຼາຍ
- **ຄູ-ພະນັກງານ** (`staff.html`): CRUD ຄູ-ພະນັກງານ, ຄູປະຈຳຫ້ອງ, ມອບໝາຍວິຊາໃຫ້ຄູ
- **ວິຊາການ** (`academic.html`): ບັນທຶກຄະແນນຕໍ່ພາກຮຽນ/ວິຊາ, ບັນທຶກການເຂົ້າຮຽນ/ຂາດຮຽນ
- **ການເງິນ** (`finance.html`): ກຳນົດປະເພດ+ໂຄງສ້າງຄ່າທຳນຽມ, ອອກໃບແຈ້ງໜີ້ໃຫ້ທັງຫ້ອງ, ບັນທຶກການຊຳລະ

## ໂມດູນທີ່ຈະຕື່ມພາຍຫຼັງ

Dashboard/ລາຍງານສະຖິຕິລວມ — ຕາມໂຄງສ້າງ database ໃນ `sql/school-management-schema.sql`
