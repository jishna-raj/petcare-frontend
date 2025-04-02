import React, { useEffect, useState } from 'react'
import PetCards from './PetCards'
import './petview.css'
import { getAllPetApi } from '../../../services/allApi'
import { Link } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'



function PetView() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBreed, setSelectedBreed] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [uniqueBreeds, setUniqueBreeds] = useState([])

  // Fetch pets and extract unique breeds
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await getAllPetApi()
        console.log(response);
        
        if (response.data && response.data.success) {
          setPets(response.data.data)
          // Extract unique breeds
          const breeds = [...new Set(response.data.data
            .map(pet => pet.breed)
            .filter(breed => breed && breed.trim() !== '')
          )]
          setUniqueBreeds(breeds)
        }
      } catch (err) {
        setError(err.message || 'Error fetching pets')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPets()
  }, [])

  // Combined filter function
  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.location.toLowerCase().includes(searchTerm.toLowerCase())


      
      
    
    const matchesBreed = selectedBreed === 'all' || 
      pet.breed?.toLowerCase() === selectedBreed.toLowerCase()
    
    return matchesSearch && matchesBreed
  })


  console.log(filteredPets);

  return (
    <div className="pet-view-container">
      {/* Search Header */}
      <div className="search-header1">
        <div className="header-shapes1">
          <div className="shape circle1"></div>
          <div className="shape triangle1"></div>
          <div className="shape wave1"></div>
        </div>
        
        <div className="container">
        
            <h1 className="page-title">
            
              Discover Your Perfect 
              <span className="highlight"> Companion</span>
            </h1>


                     
         
          <div className="search-bar-container1">
            <div className="input-group1">
              <i className="fas fa-search search-icon1"></i>
              <input
                type="text"
                className="search-input"
                placeholder="Search by name, breed, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="filter-container">
                <button 
                  className="filter-button1"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <i className="fas fa-sliders-h"></i> Filters
                </button>
                {showFilters && (
                  <div className="filter-dropdown">
                    <div className="filter-section">
                      <label>Breed:</label>
                      <select
                        value={selectedBreed}
                        onChange={(e) => setSelectedBreed(e.target.value)}
                        className="breed-select"
                      >
                        <option value="all">All Breeds</option>
                        {uniqueBreeds.map(breed => (
                          <option key={breed} value={breed}>
                            {breed}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button 
                      className="close-filter-btn"
                      onClick={() => setShowFilters(false)}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="search-suggestions1">
              <button 
                className="suggestion-tag"
                onClick={() => setSelectedBreed('all')}
              >
                <i className="fas fa-paw"></i> Show All
              </button>
              {uniqueBreeds.slice(0, 3).map(breed => (
                <button
                  key={breed}
                  className="suggestion-tag"
                  onClick={() => setSelectedBreed(breed)}
                >
                  <i className="fas fa-dog"></i> {breed}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pets Grid */}
      <div className="pets-grid container">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : filteredPets.length === 0 ? (
          <div className="alert alert-info">
            No pets found matching your search criteria
          </div>
        ) : (
          <div className="row g-4">
            {filteredPets.map(pet => (
              <div className="col-md-3" key={pet._id}>
                <PetCards
                  pet={pet}
                  
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Link to={"/service"}> <button className='btn text-secondary fw-bold' style={{marginLeft:'1200px'}} >back</button></Link>
    </div>
  )
}

export default PetView