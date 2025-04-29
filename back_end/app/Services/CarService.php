<?php

namespace App\Services;

use App\Models\Car;
use App\Repositories\Interfaces\CarRepositoryInterface;
use Illuminate\Http\Request;

class CarService
{
    protected $carRepository;

    public function __construct(CarRepositoryInterface $carRepository)
    {
        $this->carRepository = $carRepository;
    }

    public function getAllCars()
    {
        return $this->carRepository->getAll();
    }

    public function getCarById(int $id)
    {
        return $this->carRepository->getById($id);
    }

    public function createCar(array $data, $image = null)
    {
        if ($image) {
            $data['image'] = $this->carRepository->saveImage($image);
        }

        return $this->carRepository->create($data);
    }

    public function updateCar(Car $car, array $data, $image = null)
    {
        if ($image) {
            if ($car->image) {
                $this->carRepository->deleteImage($car->image);
            }
            $data['image'] = $this->carRepository->saveImage($image);
        }

        return $this->carRepository->update($car, $data);
    }

    public function deleteCar(Car $car)
    {
        if ($car->image) {
            $this->carRepository->deleteImage($car->image);
        }

        return $this->carRepository->delete($car);
    }
}