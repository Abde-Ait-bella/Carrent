<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */

    public function run(): void
    {
        $this->call([
            CarSeeder::class,
            ReservationSeeder::class,
        ]);

        //  $this->call([
        //     PermissionSeeder::class,
        // ]);

        User::factory(10)->create();

        // $adminRole = Role::create(['name' => 'admin']);
        // $userRole = Role::create(['name' => 'user']);

        // // $adminRole->givePermissionTo(['cars.index', 'cars.store', 'cars.show', 'cars.update', 'cars.destroy', 'reservations.index', 'reservations.show']);
        // $userRole->givePermissionTo(['login', 'signup', 'logout']);

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $admin = User::where('email', 'test-2@gmail.com')->first();
        if ($admin) {
            $admin->assignRole('admin');
        }

    }
}
