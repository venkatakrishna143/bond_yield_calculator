import React, { useState } from 'react';
import axios from 'axios';

type CouponFrequency = 'annual' | 'semi-annual';

interface BondInputs {
  faceValue: number;
  annualCouponRate: number;
  marketPrice: number;
  yearsToMaturity: number;
  couponFrequency: CouponFrequency;
}

interface CashFlow {
  period: number;
  paymentDate: string;
  couponPayment: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
}

interface BondResult {
  annualCouponPayment: number;
  currentYield: number;
  ytm: number;
  totalInterest: number;
  premiumDiscount: string;
  cashFlowSchedule: CashFlow[];
}

const BondCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<BondInputs>({
    faceValue: 1000,
    annualCouponRate: 10,
    marketPrice: 950,
    yearsToMaturity: 5,
    couponFrequency: 'annual',
  });

  const [result, setResult] = useState<BondResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: name === 'couponFrequency' ? value : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post<BondResult>('http://localhost:3000/api/bond/calculate', inputs);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Error calculating bond.');
    } finally {
      setLoading(false);
    }
  };

  // Prepare empty table rows initially
  const tableRows = result
    ? result.cashFlowSchedule
    : Array.from({ length: inputs.yearsToMaturity }, (_, i) => ({
        period: i + 1,
        paymentDate: '',
        couponPayment: 0,
        cumulativeInterest: 0,
        remainingPrincipal: 0,
      }));

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#e6f0ff', padding: 20 }}>
      <div style={{ maxWidth: 800, margin: 'auto', backgroundColor: 'white', padding: 20, borderRadius: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#004080', marginBottom: 10 }}>Bond Yield Calculator</h2>
        <p style={{ fontSize: 14, color: '#333', marginBottom: 15 }}>
          Fill in the bond details below. <br />
          <strong>Note:</strong> Face value is the capital amount. Coupon is yearly interest paid.
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Face Value</label>
            <input type="number" name="faceValue" value={inputs.faceValue} onChange={handleChange} style={{ padding: 8, borderRadius: 5, border: '1px solid #ccc' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Annual Coupon Rate (%)</label>
            <input type="number" name="annualCouponRate" value={inputs.annualCouponRate} onChange={handleChange} style={{ padding: 8, borderRadius: 5, border: '1px solid #ccc' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Market Price</label>
            <input type="number" name="marketPrice" value={inputs.marketPrice} onChange={handleChange} style={{ padding: 8, borderRadius: 5, border: '1px solid #ccc' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Years to Maturity</label>
            <input type="number" name="yearsToMaturity" value={inputs.yearsToMaturity} onChange={handleChange} style={{ padding: 8, borderRadius: 5, border: '1px solid #ccc' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Coupon Frequency</label>
            <select name="couponFrequency" value={inputs.couponFrequency} onChange={handleChange} style={{ padding: 8, borderRadius: 5, border: '1px solid #ccc' }}>
              <option value="annual">Annual</option>
              <option value="semi-annual">Semi-Annual</option>
            </select>
          </div>
          <div style={{ gridColumn: 'span 2', textAlign: 'right' }}>
            <button type="submit" style={{ backgroundColor: '#004080', color: 'white', padding: '10px 20px', borderRadius: 5, border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0066cc'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#004080'}
            >
              {loading ? 'Calculating...' : 'Calculate'}
            </button>
          </div>
        </form>
      </div>

      {/* Results + Cash Flow Table */}
      <div style={{ maxWidth: 800, margin: '20px auto', backgroundColor: 'white', padding: 20, borderRadius: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.1)', transition: 'all 0.3s' }}>
        <h3 style={{ color: '#004080', marginBottom: 10 }}>Results</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 15 }}>
          <div>Annual Coupon Payment: <strong>{result ? result.annualCouponPayment.toFixed(2) : '-'}</strong></div>
          <div>Current Yield: <strong>{result ? (result.currentYield*100).toFixed(2)+'%' : '-'}</strong></div>
          <div>Yield to Maturity (YTM): <strong>{result ? result.ytm.toFixed(2) : '-'}</strong></div>
          <div>Total Interest: <strong>{result ? result.totalInterest.toFixed(2) : '-'}</strong></div>
          <div>Premium / Discount: <strong>{result ? result.premiumDiscount : '-'}</strong></div>
        </div>

        <h4 style={{ color: '#004080', marginBottom: 10 }}>Cash Flow Schedule</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#cce0ff', color: '#004080' }}>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: 8 }}>Period</th>
                <th style={{ border: '1px solid #ccc', padding: 8 }}>Payment Date</th>
                <th style={{ border: '1px solid #ccc', padding: 8 }}>Coupon Payment</th>
                <th style={{ border: '1px solid #ccc', padding: 8 }}>Cumulative Interest</th>
                <th style={{ border: '1px solid #ccc', padding: 8 }}>Remaining Principal</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map(cf => (
                <tr key={cf.period} style={{ transition: 'background 0.3s', cursor: 'default' }} onMouseOver={e => (e.currentTarget.style.backgroundColor = '#e6f0ff')} onMouseOut={e => (e.currentTarget.style.backgroundColor = 'white')}>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{cf.period}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{cf.paymentDate ? new Date(cf.paymentDate).toLocaleDateString() : '-'}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{cf.couponPayment ? cf.couponPayment.toFixed(2) : '-'}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{cf.cumulativeInterest ? cf.cumulativeInterest.toFixed(2) : '-'}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{cf.remainingPrincipal ? cf.remainingPrincipal.toFixed(2) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BondCalculator;