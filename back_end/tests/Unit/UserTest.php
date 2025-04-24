<?php

namespace Tests\Unit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_user (){
        $data = [
            'name' => 'John Doe',
            'email' => 'abdessamad98@gmail.com',
            'password' => 'password123',
        ];

        $response = $this->postJson('/api/signup', $data);

        $response->assertStatus(201);

        $this->assertDatabaseHas("users", ["email" => "abdessamad98@gmail.com"]);

        $user = User::Where("email", "abdessamad98@gmail.com")->first();

        $this->assertTrue(Hash::check("password123", $user->password));

    }
}