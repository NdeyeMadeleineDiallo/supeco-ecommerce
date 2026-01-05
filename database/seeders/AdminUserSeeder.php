<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@supeco.com'],
            [
                'name' => 'Hamidou Camara',
                'password' => Hash::make('admin123'),
                'is_admin' => true,
            ]
        );
    }
}
