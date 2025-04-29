<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarRequest;
use App\Models\Car;
use App\Http\Controllers\Controller;
use App\Services\CarService;
use Illuminate\Http\Request;

class CarController extends Controller
{
    protected $carService;

    public function __construct(CarService $carService)
    {
        $this->carService = $carService;
    }

    /**
    * @OA\POST(
    * path="/api/cars",
    * summary="Retrieve all available cars",
    * description="Returns a list of all cars available in the system, including details such as brand, model, year, color, engine type, mileage, rental price per day, and availability status.",
    * @OA\RequestBody(
    * required=true,
    * @OA\JsonContent(
    * @OA\Property(property="brand", type="string", example="Toyota"),
    * @OA\Property(property="model", type="string", example="Corolla"),
    * @OA\Property(property="registration_number", type="string", example="wp744"),
    * @OA\Property(property="year", type="integer", example=2004),
    * @OA\Property(property="color", type="string", example="gray"),
    * @OA\Property(property="engine", type="string", example="1.8L VVT-i"),
    * @OA\Property(property="image", type="string", example="cars/default.jpg"),
    * @OA\Property(property="quantity", type="integer", example=5),
    * @OA\Property(property="mileage", type="integer", example=7995),
    * @OA\Property(property="resduce", type="integer", example=4),
    * @OA\Property(property="stars", type="integer", example=4),
    * @OA\Property(property="price_per_day", type="number", format="float", example=53.43),
    * @OA\Property(property="status", type="string", example="available"),
    * @OA\Property(property="description", type="string", example="Non non voluptatibus numquam quaerat."),
    *)),
    * security={{"bearerAuth":{}}},
    * tags={"Cars"},
    * @OA\Response(response="200", description="Cars data"),
    * @OA\Response(response="403", description="Unauthenticated"),)
    */
    public function index()
    {
        $cars = $this->carService->getAllCars();
        return response()->json($cars);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CarRequest $request)
    {
        $validated = $request->validated();
        $image = $request->hasFile('image') ? $request->file('image') : null;
        
        $car = $this->carService->createCar($validated, $image);

        return response()->json([$car, 'status'=>201], 201);
    }

    /**
     * Display the specified resource.
     * 
     * @OA\Get(
     *     path="/api/cars/{id}",
     *     summary="Get car by ID",
     *     description="Returns a specific car's details based on the provided ID",
     *     tags={"Cars"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the car to retrieve",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response="200", description="Car data retrieved successfully"),
     *     @OA\Response(response="404", description="Car not found"),
     * )
     */
    public function show(Car $car)
    {
        return response()->json(['data' => $car, 'status' => 200], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Car $car)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CarRequest $request, Car $car)
    {
        $validated = $request->validated();
        $image = $request->hasFile('image') ? $request->file('image') : null;
        
        $updatedCar = $this->carService->updateCar($car, $validated, $image);

        return response()->json([$updatedCar, 'status' => 200], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Car $car)
    {
        $this->carService->deleteCar($car);
        return response()->json(['message' => 'Car deleted successfully', 'status' => 200]);
    }
}
