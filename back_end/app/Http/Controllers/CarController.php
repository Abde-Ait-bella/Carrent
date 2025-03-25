<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarRequest;
use App\Models\Car;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Storage;

class CarController extends Controller
{


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
        $cars = Car::all();
        return response()->json($cars);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CarRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('cars', 'public');
        }

        $car = Car::create($validated);

        return response()->json($car, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Car $car)
    {
        //
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

        if ($request->hasFile('image')) {
            if ($car->image) {
                Storage::disk('public')->delete($car->image);
            }
			$validated['image'] = $request->file('image')->store('cars', 'public');
			
        }
        
        $car->update($validated); 
        return response()->json($car);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Car $car)
    {
        if ($car->image) {
            Storage::disk('public')->delete($car->image);
        }

        $car->delete();
        return response()->json(['message' => 'Car deleted successfully']);
    }
}
