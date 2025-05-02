'use client';
import React, { useEffect, useState } from 'react';
import './CreateOrganization.css';
import { updateOrganization ,getOrganizationsById} from '../services/ApiService';
import { useParams} from 'react-router-dom';


const UpdateOrganizationForm = ({ onSubmit, initialData }) => {
    const { id } = useParams();
    const [organization, setOrganization] = useState({
        id: '', 
        name: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
        },
        phoneNumber: '',
        email: '',
        specialties: [],
        description: '',
        tags: [],
    });

    const [newSpecialty, setNewSpecialty] = useState('');
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        const fetchOrganization = async (id) => {
            if (id) {
                try {
                    const data = await getOrganizationsById(id);
                    setOrganization(data);
                } catch (error) {
                    console.error('Failed to fetch organization:', error);
                }
            }
        };

        fetchOrganization(id);
    }, [id]);

    useEffect(() => {
        if (initialData) {
            setOrganization(initialData);
        }
    }, [initialData]);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrganization(prev => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setOrganization(prev => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value,
            },
        }));
    };
    const handleAddSpecialty = () => {
        const trimmed = newSpecialty.trim();
        if (trimmed && !organization.specialties.includes(trimmed)) {
            setOrganization(prev => ({
                ...prev,
                specialties: [...prev.specialties, trimmed],
            }));
            setNewSpecialty('');
        }
    };

    const handleRemoveSpecialty = (specialty) => {
        setOrganization(prev => ({
            ...prev,
            specialties: prev.specialties.filter(s => s !== specialty),
        }));
    };

    const handleAddTag = () => {
        const trimmed = newTag.trim();
        if (trimmed && !organization.tags.includes(trimmed)) {
            setOrganization(prev => ({
                ...prev,
                tags: [...prev.tags, trimmed],
            }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (tag) => {
        setOrganization(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tag),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (organization.name && organization.email) {
            try {
                await updateOrganization(initialData.id, initialData);
            } catch (error) {
                console.error('Error submitting organization:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Organization Name*</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={organization.name}
                    onChange={handleInputChange}
                    required
                />
                <div className="invalid-feedback">Please provide a name.</div>
            </div>

            <fieldset className="mb-3 border p-3">
                <legend>Address</legend>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="street" className="form-label">Street</label>
                        <input
                            type="text"
                            className="form-control"
                            id="street"
                            name="street"
                            value={organization.address.street}
                            onChange={handleAddressChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={organization.address.city}
                            onChange={handleAddressChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="state" className="form-label">State</label>
                        <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                            value={organization.address.state}
                            onChange={handleAddressChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="zipCode" className="form-label">Zip Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="zipCode"
                            name="zipCode"
                            value={organization.address.zipCode}
                            onChange={handleAddressChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="country" className="form-label">Country</label>
                        <input
                            type="text"
                            className="form-control"
                            id="country"
                            name="country"
                            value={organization.address.country}
                            onChange={handleAddressChange}
                        />
                    </div>
                </div>
            </fieldset>

            <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={organization.phoneNumber}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email*</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={organization.email}
                    onChange={handleInputChange}
                    required
                />
                <div className="invalid-feedback">Please provide a valid email.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows={3}
                    value={organization.description}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Specialties</label>
                <div className="input-group mb-2">
                    <input
                        type="text"
                        className="form-control"
                        value={newSpecialty}
                        onChange={(e) => setNewSpecialty(e.target.value)}
                        placeholder="Add a specialty"
                    />
                    <button type="button" className="btn btn-outline-secondary" onClick={handleAddSpecialty}>Add</button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                    {organization.specialties.map(specialty => (
                        <span key={specialty} className="badge bg-primary">
                            {specialty}
                            <button
                                type="button"
                                className="ms-2 btn-close btn-close-white"
                                aria-label="Remove"
                                onClick={() => handleRemoveSpecialty(specialty)}
                            />
                        </span>
                    ))}
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Tags</label>
                <div className="input-group mb-2">
                    <input
                        type="text"
                        className="form-control"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                    />
                    <button type="button" className="btn btn-outline-secondary" onClick={handleAddTag}>Add</button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                    {organization.tags.map(tag => (
                        <span key={tag} className="badge bg-secondary">
                            {tag}
                            <button
                                type="button"
                                className="ms-2 btn-close btn-close-white"
                                aria-label="Remove"
                                onClick={() => handleRemoveTag(tag)}
                            />
                        </span>
                    ))}
                </div>
            </div>

            <button  className="submitButton" onClick={handleSubmit}>
                {'Update'} 
            </button>
        </form>
    );
};

export default UpdateOrganizationForm;
