<?php

namespace App\Repositories;

use App\Models\Car;
use App\Repositories\Interfaces\CarRepositoryInterface;
use Illuminate\Http\UploadedFile;
use Storage;

class CarRepository implements CarRepositoryInterface
{
    public function getAll()
    {
        return Car::all();
    }

    public function getById(int $id)
    {
        return Car::findOrFail($id);
    }

    public function create(array $data)
    {
        return Car::create($data);
    }

    public function update(Car $car, array $data)
    {
        $car->update($data);
        return $car;
    }

    public function delete(Car $car)
    {
        return $car->delete();
    }

    public function saveImage(UploadedFile $image)
    {
        return $image->store('cars', 'public');
    }

    public function deleteImage(string $path)
    {
        if ($path) {
            return Storage::disk('public')->delete($path);
        }
        return false;
    }
}