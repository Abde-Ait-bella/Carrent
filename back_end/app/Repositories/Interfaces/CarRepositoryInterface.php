<?php

namespace App\Repositories\Interfaces   ;

use App\Models\Car;
use Illuminate\Http\UploadedFile;

interface CarRepositoryInterface
{
    public function getAll();
    public function getById(int $id);
    public function create(array $data);
    public function update(Car $car, array $data);
    public function delete(Car $car);
    public function saveImage(UploadedFile $image);
    public function deleteImage(string $path);
}